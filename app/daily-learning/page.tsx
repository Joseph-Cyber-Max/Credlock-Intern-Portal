"use client";

import { useEffect, useState } from "react";

export default function DailyLearning() {
  const [logs,setLogs]=useState<any[]>([]),[form,setForm]=useState({date:new Date().toISOString().slice(0,10),activity:"",learning:"",technicalTask:"",cybersecurityNote:"",reflection:""}),[message,setMessage]=useState(""),[loading,setLoading]=useState(true);
  async function load(){const r=await fetch("/api/daily-logs");if(r.ok)setLogs(await r.json());setLoading(false)}
  useEffect(()=>{load()},[]);
  async function submit(e:React.FormEvent){e.preventDefault();setMessage("");const r=await fetch("/api/daily-logs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});const data=await r.json();if(!r.ok){setMessage(data.error||"Unable to save log");return}setMessage("Daily learning log saved.");await load()}
  return <div className="page"><label>DAILY LEARNING</label><h1>Daily Activity Log</h1><p>Record what you worked on, learned and observed during the internship.</p>
    <div className="surface" style={{marginTop:24}}><form onSubmit={submit} style={{display:"grid",gap:12,maxWidth:800}}>
      <label>Date</label><input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
      <label>Activity</label><textarea required placeholder="What did you work on today?" value={form.activity} onChange={e=>setForm({...form,activity:e.target.value})}/>
      <label>Learning</label><textarea placeholder="What did you learn?" value={form.learning} onChange={e=>setForm({...form,learning:e.target.value})}/>
      <label>Technical task</label><textarea placeholder="Technical support task performed" value={form.technicalTask} onChange={e=>setForm({...form,technicalTask:e.target.value})}/>
      <label>Cybersecurity note</label><textarea placeholder="Security/privacy observation" value={form.cybersecurityNote} onChange={e=>setForm({...form,cybersecurityNote:e.target.value})}/>
      <label>Reflection</label><textarea placeholder="What would you improve or investigate further?" value={form.reflection} onChange={e=>setForm({...form,reflection:e.target.value})}/>
      <button className="primary-btn" type="submit">Save daily log</button>{message&&<p>{message}</p>}
    </form></div>
    <div className="surface" style={{marginTop:16}}><div className="section-head"><div><label>HISTORY</label><h2>Recent learning logs</h2></div></div>
      {loading?<p>Loading...</p>:logs.length===0?<p>No daily logs yet.</p>:logs.map(x=><div className="module-row" key={x.id}><div className="module-number">{new Date(x.date).getDate()}</div><div><strong>{new Date(x.date).toLocaleDateString()}</strong><small>{x.activity}</small></div><span>LOGGED</span></div>)}
    </div>
  </div>
}
