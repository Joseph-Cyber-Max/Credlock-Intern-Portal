import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {getServerSession} from "@/lib/server-session";

export async function GET(){
  const s=await getServerSession();
  if(!s)return NextResponse.json({error:"Unauthorized"},{status:401});

  const where=s.role==="INTERN"?{userId:s.id}:undefined;
  const interns=await db.intern.findMany({
    where,
    include:{user:true,enrollments:true,evaluations:true,projects:true},
    orderBy:{createdAt:"desc"}
  });

  return NextResponse.json(interns.map(i=>({
    id:i.id,
    name:i.user.name,
    email:i.user.email,
    role:i.user.role,
    department:i.department,
    progress:i.progress,
    quizAverage:i.quizAverage,
    modulesCompleted:i.enrollments.filter(x=>x.completed).length,
    projects:i.projects.length
  })));
}