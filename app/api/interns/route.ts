import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/server-session";

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const where = session.role === "INTERN" ? { userId: session.id } : undefined;
  const interns = await db.intern.findMany({
    where,
    include: { user: true, department: true, enrollments: true, evaluations: true, projects: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(interns.map((intern) => ({
    id: intern.id,
    internId: intern.internId,
    name: intern.user.name,
    email: intern.user.email,
    role: intern.user.role,
    department: intern.department?.name ?? "Unassigned",
    status: intern.status,
    progress: intern.progress,
    quizAverage: intern.quizAverage,
    modulesCompleted: intern.enrollments.filter((item) => item.completed).length,
    projects: intern.projects.length,
  })));
}
