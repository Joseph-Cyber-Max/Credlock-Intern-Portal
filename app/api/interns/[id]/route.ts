import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/server-session";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const intern = await db.intern.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true, role: true, createdAt: true } },
      department: true,
      school: true,
      program: { include: { weeks: { orderBy: { week: "asc" } } } },
      supervisor: { include: { user: { select: { name: true, email: true } } } },
      enrollments: { include: { module: true } },
      dailyLogs: { orderBy: { date: "desc" }, take: 10 },
      weeklyReports: { orderBy: { week: "desc" }, take: 12 },
      quizAttempts: { orderBy: { startedAt: "desc" }, take: 10, include: { quiz: true } },
      skills: { include: { skill: true } },
      projects: { orderBy: { createdAt: "asc" }, include: { milestones: true, submissions: true, reviews: true } },
      monthlyEvaluations: { orderBy: [{ year: "desc" }, { month: "desc" }], take: 6, include: { scores: true } },
      documents: { include: { type: true }, orderBy: { uploadedAt: "desc" } },
      leaveRequests: { orderBy: { startDate: "desc" } },
      incidents: { orderBy: { createdAt: "desc" } },
      performance: { orderBy: { periodStart: "desc" }, take: 12 },
      performanceFlags: { orderBy: { createdAt: "desc" }, take: 12 },
      competencyAssessments: { include: { pillar: true } },
    },
  });

  if (!intern) return NextResponse.json({ error: "Intern not found" }, { status: 404 });
  if (session.role === "INTERN" && intern.userId !== session.id)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  return NextResponse.json(intern);
}
