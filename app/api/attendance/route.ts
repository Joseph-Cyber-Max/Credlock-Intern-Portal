import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/server-session";

export async function GET() {
  const s = await getServerSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await db.attendance.findMany({
    where: s.role === "INTERN" ? { internId: s.id } : {},
    include: { intern: { select: { name: true, email: true } } },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const s = await getServerSession();
  if (!s || s.role === "INTERN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const b = await req.json();
  if (!b.internId || !b.date || !b.status) return NextResponse.json({ error: "internId, date and status are required" }, { status: 400 });
  const date = new Date(b.date);
  if (Number.isNaN(date.getTime())) return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  if (!["PRESENT","ABSENT","LATE","EXCUSED"].includes(b.status)) return NextResponse.json({ error: "Invalid attendance status" }, { status: 400 });
  const intern = await db.intern.findUnique({ where: { id: b.internId }, select: { userId: true } });
  if (!intern) return NextResponse.json({ error: "Intern not found" }, { status: 404 });

  const row = await db.attendance.upsert({
    where: { internId_date: { internId: intern.userId, date } },
    update: { status: b.status, note: b.note },
    create: { internId: intern.userId, date, status: b.status, note: b.note },
  });
  return NextResponse.json(row, { status: 201 });
}
