import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/server-session";

export async function GET() {
  const s = await getServerSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await db.task.findMany({
    where: s.role === "INTERN" ? { assignedToId: s.id } : {},
    include: { assignedTo: { select: { id: true, name: true, email: true } }, createdBy: { select: { name: true } }, comments: { orderBy: { createdAt: "asc" }, include: { user: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const s = await getServerSession();
  if (!s || s.role === "INTERN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const b = await req.json();
  if (!b.title) return NextResponse.json({ error: "title is required" }, { status: 400 });
  if (b.status && !["TODO","IN_PROGRESS","REVIEW","DONE"].includes(b.status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  if (b.priority && !["CRITICAL","HIGH","MEDIUM","LOW"].includes(b.priority)) return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
  if (b.assignedToId) {
    const user = await db.user.findUnique({ where: { id: b.assignedToId }, select: { id: true, role: true } });
    if (!user || user.role !== "INTERN") return NextResponse.json({ error: "assignedToId must belong to an intern" }, { status: 400 });
  }
  const row = await db.task.create({
    data: {
      title: b.title.trim(),
      description: b.description,
      status: b.status ?? "TODO",
      priority: b.priority ?? "MEDIUM",
      dueDate: b.dueDate ? new Date(b.dueDate) : undefined,
      assignedToId: b.assignedToId || undefined,
      createdById: s.id,
    },
    include: { assignedTo: { select: { id: true, name: true, email: true } } },
  });
  return NextResponse.json(row, { status: 201 });
}

export async function PATCH(req: Request) {
  const s = await getServerSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  if (!b.id) return NextResponse.json({ error: "id is required" }, { status: 400 });
  const task = await db.task.findUnique({ where: { id: b.id } });
  if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
  if (s.role === "INTERN" && task.assignedToId !== s.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const data: any = {};
  if (b.status !== undefined) {
    if (!["TODO","IN_PROGRESS","REVIEW","DONE"].includes(b.status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    data.status = b.status;
  }
  if (b.title !== undefined && s.role !== "INTERN") data.title = String(b.title).trim();
  if (b.description !== undefined && s.role !== "INTERN") data.description = b.description;
  if (b.priority !== undefined && s.role !== "INTERN") data.priority = b.priority;
  if (b.dueDate !== undefined && s.role !== "INTERN") data.dueDate = b.dueDate ? new Date(b.dueDate) : null;
  return NextResponse.json(await db.task.update({ where: { id: b.id }, data }));
}
