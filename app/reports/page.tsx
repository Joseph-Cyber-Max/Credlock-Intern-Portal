"use client";

import { useEffect, useState } from "react";

const labels: Record<string,string>={DRAFT:"Draft",SUBMITTED:"Submitted",UNDER_REVIEW:"Under review",APPROVED:"Approved",REJECTED:"Rejected"};

export default function Reports(){
 const [rows,setRows]=useState<any[]>([]),[session,setSession]=useState<any>(null),[form,setForm]=useState({week:"1",summary:"",achievements:"",challenges:"",learning:""}),[review,setReview]=useState<Record<string,{status:string,note:string}>>({}),[message,setMessage]=useState(""),[loading,setLoading]=useState(true);
 async function load(){const [rr,ss]=await Promise.all([fetch("/api/reports"),fetch("/api/me")]);if(rr.ok)setRows(await rr.json());if(ss.ok)setSession(await ss.json());setLoading(false)}
 useEffect(()=>{load()},[]);
 async function submit(e:React.FormEvent){e.preventDefault();setMessage("");const r=await fetch("/api/reports",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,week:Number(form.week)})});const d=await r.json();setMessage(r.ok?"Weekly report submitted.":d.error||"Unable to submit report");if(r.ok){setForm({...form,summary:"",achievements:"",challenges:"",learning:""});load()}}
 async function reviewReport(id:string){const x=review[id]||{status:"APPROVED",note:""};const r=await fetch("/api/reports",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status:x.status,reviewNote:x.note})});const d=await r.json();setMessage(r.ok?"Review saved.":d.error||"Unable to review");if(r.ok)load()}
 const isIntern=session?.role==="INTERN";
 return <div className="page"><label>REPORTING</label><h1>Weekly Reports</h1><p>Submit weekly learning summaries and track supervisor review.</p>
 {isIntern&&<div className="surface" style={{marginTop:24}}><div className="section-head"><div><label>INTERN SUBMISSION</label><h2>Submit a weekly report</h2></div></div><form onSubmit={submit} style={{display:"grid",gap:12,maxWidth:850}}>
 <label>Programme week</label><select value={form.week} onChange={e=>setForm({...form,week:e.target.value})}>{Array.from({length:12},(_,i)=><option key={i+1}>{i+1}</option>)}</select>
 <label>Summary</label><textarea required placeholder="Summarise your week..." value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})}/>
 <label>Achievements</label><textarea placeholder="Key tasks or outcomes" value={form.achievements} onChange={e=>setForm({...form,achievements:e.target.value})}/>
 <label>Challenges</label><textarea placeholder="Challenges or blockers" value={form.challenges} onChange={e=>setForm({...form,challenges:e.target.value})}/>
 <label>Learning</label><textarea placeholder="What did you learn?" value={form.learning} onChange={e=>setForm({...form,learning:e.target.value})}/>
 <button className="primary-btn" type="submit">Submit report</button>{message&&<p>{message}</p>}</form></div>}
 <div className="surface" style={{marginTop:16}}><div className="section-head"><div><label>REPORT QUEUE</label><h2>{isIntern?"My reports":"Supervisor review queue"}</h2></div></div>
 {loading?<p>Loading...</p>:rows.length===0?<p>No weekly reports yet.</p>:rows.map(x=><div className="module-row" key={x.id}><div className="module-number">{x.week}</div><div style={{flex:1}}><strong>Week {x.week} · {x.intern?.user?.name||"Intern"}</strong><small>{x.summary}</small>{x.reviewNote&&<small>Review: {x.reviewNote}</small>}</div><span className="pill">{labels[x.status]||x.status}</span>{!isIntern&&<div style={{display:"flex",gap:8}}><select value={review[x.id]?.status||"APPROVED"} onChange={e=>setReview({...review,[x.id]:{status:e.target.value,note:review[x.id]?.note||""}})}><option>APPROVED</option><option>REJECTED</option><option>UNDER_REVIEW</option></select><input placeholder="Review note" value={review[x.id]?.note||""} onChange={e=>setReview({...review,[x.id]:{status:review[x.id]?.status||"APPROVED",note:e.target.value}})}/><button onClick={()=>reviewReport(x.id)}>Save</button></div>}</div>)}</div></div>
}
