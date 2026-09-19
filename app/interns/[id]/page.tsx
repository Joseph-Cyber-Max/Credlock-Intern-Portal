"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function InternProfile({ params }: { params: Promise<{ id: string }> }) {
  const [data,setData]=useState<any>(null),[error,setError]=useState(""),[loading,setLoading]=useState(true);
  useEffect(()=>{params.then(p=>fetch(`/api/interns/${p.id}`).then(async r=>{if(!r.ok)throw new Error((await r.json()).error||"Unable to load profile.");return r.json()}).then(setData).catch(e=>setError(e.message)).finally(()=>setLoading(false)))},[params]);
  if(loading)return <div className="page"><p>Loading intern profile...</p></div>;
  if(error)return <div className="page"><p role="alert">{error}</p><Link href="/interns">← Back to interns</Link></div>;
  const completed=data.enrollments?.filter((x:any)=>x.completed).length||0;
  return <div className="page">
    <Link href="/interns" style={{color:"var(--accent)",fontSize:11}}>← Intern Directory</Link>
    <div className="dashboard-hero" style={{marginTop:20}}><div><label>INTERN PROFILE</label><h1>{data.user.name}</h1><p>{data.internId} · {data.user.email}</p></div><div><strong>{data.status}</strong></div></div>
    <div className="metric-grid">
      <div className="metric"><span>PROGRAMME PROGRESS</span><strong>{data.progress}%</strong><small>{completed}/12 modules completed</small></div>
      <div className="metric"><span>QUIZ AVERAGE</span><strong>{data.quizAverage}%</strong><small>Recorded quiz performance</small></div>
      <div className="metric"><span>PROJECTS</span><strong>{data.projects?.length||0}/5</strong><small>Practical programme projects</small></div>
      <div className="metric"><span>STATUS</span><strong style={{fontSize:18}}>{data.status}</strong><small>{data.department?.name||"Unassigned"}</small></div>
    </div>
    <div className="dashboard-grid">
      <div className="surface"><div className="section-head"><div><label>PROGRAMME</label><h2>12-week learning progress</h2></div></div>
        {data.enrollments?.length ? data.enrollments.map((x:any)=><div className="week-progress" key={x.id}><div><strong>Week {x.module.week}: {x.module.title}</strong><span>{x.completed?"Completed":"Not started"}</span></div><div className="progress large"><i style={{width:x.completed?"100%":"0%"}}/></div></div>) : <p>No learning records yet.</p>}
      </div>
      <div className="surface"><div className="section-head"><div><label>PROFILE</label><h2>Programme details</h2></div></div>
        <p><strong>School:</strong> {data.school?.name||"Not assigned"}</p><p><strong>Department:</strong> {data.department?.name||"Not assigned"}</p><p><strong>Supervisor:</strong> {data.supervisor?.user?.name||"Not assigned"}</p><p><strong>Programme:</strong> {data.program?.name||"Not assigned"}</p><p><strong>Level:</strong> {data.programmeLevel||"Not recorded"}</p>
      </div>
    </div>
    <div className="surface" style={{marginTop:16}}><div className="section-head"><div><label>PROJECTS</label><h2>Practical projects</h2></div></div>
      {data.projects?.map((p:any)=><div className="module-row" key={p.id}><div className="module-number">{p.status==="DONE"?"✓":"•"}</div><div><strong>{p.title}</strong><small>{p.description}</small></div><span>{p.status}</span></div>)}
    </div>
    <div className="dashboard-grid">
      <div className="surface"><label>WEEKLY REPORTS</label><h2>Recent reports</h2>{data.weeklyReports?.length?data.weeklyReports.map((r:any)=><div className="module-row" key={r.id}><div className="module-number">{r.week}</div><div><strong>Week {r.week}</strong><small>{r.summary}</small></div><span>{r.status}</span></div>):<p>No reports submitted.</p>}</div>
      <div className="surface"><label>PERFORMANCE</label><h2>Recent records</h2>{data.performance?.length?data.performance.map((p:any)=><div className="module-row" key={p.id}><div className="module-number">{p.score}</div><div><strong>{p.periodType}</strong><small>{new Date(p.periodStart).toLocaleDateString()}</small></div><span>{p.flag}</span></div>):<p>No performance records yet.</p>}</div>
    </div>
  </div>;
}
