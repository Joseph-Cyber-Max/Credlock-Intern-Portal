import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/server-session";

export async function GET() {
  const s = await getServerSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const intern = await db.intern.findUnique({ where: { userId: s.id }, select: { id: true } });
  const rows = await db.dailyActivityLog.findMany({
    where: s.role === "INTERN" && intern ? { internId: intern.id } : {},
    orderBy: { date: "desc" },
    take: 50,
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const s = await getServerSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (s.role !== "INTERN") return NextResponse.json({ error: "Only interns can create their daily learning log" }, { status: 403 });
  const intern = await db.intern.findUnique({ where: { userId: s.id }, select: { id: true } });
  if (!intern) return NextResponse.json({ error: "Intern profile not found" }, { status: 404 });
  const b = await req.json();
  if (!b.date || !b.activity) return NextResponse.json({ error: "date and activity are required" }, { status: 400 });
  const date = new Date(b.date);
  if (Number.isNaN(date.getTime())) return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  const row = await db.dailyActivityLog.upsert({
    where: { internId_date: { internId: intern.id, date } },
    update: { activity: b.activity, learning: b.learning, technicalTask: b.technicalTask, cybersecurityNote: b.cybersecurityNote, reflection: b.reflection },
    create: { internId: intern.id, date, activity: b.activity, learning: b.learning, technicalTask: b.technicalTask, cybersecurityNote: b.cybersecurityNote, reflection: b.reflection },
  });
  return NextResponse.json(row, { status: 201 });
}
