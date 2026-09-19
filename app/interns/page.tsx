"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Intern = { id:string; internId?:string; name:string; email:string; role:string; department?:string; status?:string; progress:number; quizAverage:number; modulesCompleted:number; projects:number };

export default function InternDirectory() {
  const [interns,setInterns]=useState<Intern[]>([]),[query,setQuery]=useState(""),[department,setDepartment]=useState("ALL"),[status,setStatus]=useState("ALL"),[loading,setLoading]=useState(true),[error,setError]=useState("");
  useEffect(()=>{fetch("/api/interns").then(async r=>{if(!r.ok)throw new Error("Unable to load interns.");return r.json()}).then(setInterns).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[]);
  const departments=useMemo(()=>["ALL",...Array.from(new Set(interns.map(i=>i.department||"Unassigned")))], [interns]);
  const statuses=useMemo(()=>["ALL",...Array.from(new Set(interns.map(i=>i.status||"UNKNOWN")))], [interns]);
  const filtered=interns.filter(i=>{const t=query.toLowerCase();return(!t||i.name.toLowerCase().includes(t)||i.email.toLowerCase().includes(t)||i.internId?.toLowerCase().includes(t))&&(department==="ALL"||(i.department||"Unassigned")===department)&&(status==="ALL"||(i.status||"UNKNOWN")===status)});
  return <div className="page"><label>INTERN MANAGEMENT</label><h1>Intern Directory</h1><p>Search and review interns registered in the Credlock internship portal.</p>
    <div className="card" style={{marginTop:24}}><div style={{display:"flex",gap:12,flexWrap:"wrap"}}><input aria-label="Search interns" placeholder="Search name, email or intern ID..." value={query} onChange={e=>setQuery(e.target.value)} style={{flex:1,minWidth:240}}/><select value={department} onChange={e=>setDepartment(e.target.value)}>{departments.map(x=><option key={x}>{x}</option>)}</select><select value={status} onChange={e=>setStatus(e.target.value)}>{statuses.map(x=><option key={x}>{x}</option>)}</select></div></div>
    <div className="card" style={{marginTop:16,overflowX:"auto"}}>{loading?<p>Loading interns...</p>:error?<p role="alert">{error}</p>:filtered.length===0?<p>No interns match the current filters.</p>:<table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th align="left">Intern</th><th align="left">Department</th><th align="left">Status</th><th align="left">Progress</th><th align="left">Quiz</th><th align="left">Projects</th></tr></thead><tbody>{filtered.map(i=><tr key={i.id}><td style={{padding:"14px 8px"}}><Link href={`/interns/${i.id}`}><strong>{i.name}</strong><div>{i.internId||i.email}</div></Link></td><td>{i.department||"Unassigned"}</td><td>{i.status||"UNKNOWN"}</td><td>{i.progress}%</td><td>{i.quizAverage}%</td><td>{i.projects}/5</td></tr>)}</tbody></table>}</div>
  </div>;
}
