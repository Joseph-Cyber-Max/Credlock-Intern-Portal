import {requireSession} from "@/lib/server-session";
import {db} from "@/lib/db";
import {ArrowUpRight,BookOpenCheck,ClipboardCheck,CalendarCheck,FolderKanban} from "lucide-react";

export default async function Dashboard(){
  const s=await requireSession();
  const intern=await db.intern.findUnique({
    where:{userId:s.id},
    include:{enrollments:true,projects:true}
  });
  const modules=await db.learningModule.findMany({orderBy:{week:"asc"}});
  const completed=intern?.enrollments.filter(x=>x.completed).length??0;
  const totalModules=modules.length||12;
  const progress=intern?.progress??Math.round(completed/totalModules*100);
  const quiz=intern?.quizAverage??0;
  const attendance=await db.attendance.findMany({where:{internId:s.id}});
  const attended=attendance.filter(x=>x.status==="PRESENT"||x.status==="LATE"||x.status==="EXCUSED").length;
  const attendanceRate=attendance.length?Math.round(attended/attendance.length*100):0;
  const projectCount=intern?.projects.length??0;

  return <div className="page">
    <section className="dashboard-hero">
      <div><span className="eyebrow">INTERN WORKSPACE · WEEK 08</span><h1>Good morning, {s.name.split(" ")[0]}.</h1><p>Keep building your technical support and cybersecurity capability.</p></div>
      <a className="outline-btn" href="/learning">View programme <ArrowUpRight size={15}/></a>
    </section>
    <div className="metric-grid">
      <Metric icon={<BookOpenCheck/>} label="Learning progress" value={progress+"%"} detail={completed+" of "+totalModules+" modules"}/>
      <Metric icon={<ClipboardCheck/>} label="Quiz average" value={quiz+"%"} detail="Across completed assessments"/>
      <Metric icon={<CalendarCheck/>} label="Attendance" value={attendanceRate+"%"} detail={attendance.length+" recorded days"}/>
      <Metric icon={<FolderKanban/>} label="Projects" value={projectCount+"/5"} detail="Practical assignments"/>
    </div>
    <div className="dashboard-grid">
      <section className="surface">
        <div className="section-head"><div><span className="eyebrow">PROGRAMME</span><h2>12-week learning path</h2></div><a href="/learning">Open curriculum <ArrowUpRight size={14}/></a></div>
        <div className="week-progress"><div><span>Overall completion</span><strong>{progress}%</strong></div><div className="progress large"><i style={{width:progress+"%"}}/></div></div>
        {modules.map((module)=><div className="module-row" key={module.id}>
          <div className={"module-number "+(module.week<=completed?"done":"")}>{module.week<=completed?"✓":String(module.week).padStart(2,"0")}</div>
          <div><strong>Week {module.week} · {module.title}</strong><small>{module.week<=completed?"Completed":"Upcoming module"}</small></div>
          <span>{module.week<=completed?"Complete":"Start"}</span>
        </div>)}
      </section>
      <section className="surface">
        <div className="section-head"><div><span className="eyebrow">TODAY</span><h2>Continue your work</h2></div></div>
        <div className="action-stack">
          <a href="/learning"><b>Resume learning</b><small>Continue the current curriculum module</small><ArrowUpRight/></a>
          <a href="/assessments"><b>Take assessment</b><small>Test your Technical Support knowledge</small><ArrowUpRight/></a>
          <a href="/technical-support"><b>Open Support Lab</b><small>Practice real Credlock device scenarios</small><ArrowUpRight/></a>
          <a href="/cybersecurity"><b>Cybersecurity Lab</b><small>Review security and incident response</small><ArrowUpRight/></a>
        </div>
      </section>
    </div>
  </div>
}

function Metric({icon,label,value,detail}:{icon:React.ReactNode;label:string;value:string;detail:string}){
  return <div className="metric"><div className="metric-icon">{icon}</div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>
}