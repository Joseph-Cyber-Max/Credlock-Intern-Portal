import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/server-session";

const statuses = ["DRAFT","SUBMITTED","UNDER_REVIEW","APPROVED","REJECTED"];

export async function GET() {
  const s = await getServerSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await db.weeklyReport.findMany({
    where: s.role === "INTERN" ? { intern: { userId: s.id } } : {},
    include: { intern: { include: { user: { select: { name: true, email: true } } } }, reviewer: { select: { name: true, email: true } } },
    orderBy: [{ week: "desc" }, { submittedAt: "desc" }],
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const s = await getServerSession();
  if (!s || s.role !== "INTERN") return NextResponse.json({ error: "Only interns can submit weekly reports" }, { status: 403 });
  const intern = await db.intern.findUnique({ where: { userId: s.id }, select: { id: true } });
  if (!intern) return NextResponse.json({ error: "Intern profile not found" }, { status: 404 });
  const b = await req.json();
  const week = Number(b.week);
  if (!Number.isInteger(week) || week < 1 || week > 12) return NextResponse.json({ error: "Week must be between 1 and 12" }, { status: 400 });
  if (!b.summary?.trim()) return NextResponse.json({ error: "Summary is required" }, { status: 400 });
  const existing = await db.weeklyReport.findUnique({ where: { internId_week: { internId: intern.id, week } } });
  if (existing?.status === "APPROVED" || existing?.status === "UNDER_REVIEW") return NextResponse.json({ error: "This report is already locked for review" }, { status: 409 });
  const row = await db.weeklyReport.upsert({
    where: { internId_week: { internId: intern.id, week } },
    update: { summary: b.summary.trim(), achievements: b.achievements, challenges: b.challenges, learning: b.learning, status: "SUBMITTED", submittedAt: new Date(), reviewNote: null, reviewerId: null, reviewedAt: null },
    create: { internId: intern.id, week, summary: b.summary.trim(), achievements: b.achievements, challenges: b.challenges, learning: b.learning, status: "SUBMITTED", submittedAt: new Date() },
  });
  return NextResponse.json(row, { status: 201 });
}

export async function PATCH(req: Request) {
  const s = await getServerSession();
  if (!s || s.role === "INTERN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const b = await req.json();
  if (!b.id || !statuses.includes(b.status)) return NextResponse.json({ error: "id and valid status are required" }, { status: 400 });
  if (!["UNDER_REVIEW","APPROVED","REJECTED"].includes(b.status)) return NextResponse.json({ error: "Invalid review status" }, { status: 400 });
  const report = await db.weeklyReport.findUnique({ where: { id: b.id } });
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });
  const updated = await db.weeklyReport.update({
    where: { id: b.id },
    data: { status: b.status, reviewNote: b.reviewNote?.trim() || null, reviewerId: s.id, reviewedAt: new Date() },
  });
  return NextResponse.json(updated);
}
