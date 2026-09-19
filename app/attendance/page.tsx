"use client";

import { useEffect, useMemo, useState } from "react";

type Row = { id:string; date:string; status:"PRESENT"|"ABSENT"|"LATE"|"EXCUSED"; note?:string; intern?:{name:string;email:string} };

export default function Attendance() {
  const [rows,setRows]=useState<Row[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState(""),[status,setStatus]=useState("ALL");
  async function load(){try{const r=await fetch("/api/attendance");if(!r.ok)throw new Error("Unable to load attendance.");setRows(await r.json())}catch(e:any){setError(e.message)}finally{setLoading(false)}}
  useEffect(()=>{load()},[]);
  const filtered=useMemo(()=>status==="ALL"?rows:rows.filter(x=>x.status===status),[rows,status]);
  const counts={present:rows.filter(x=>x.status==="PRESENT").length,absent:rows.filter(x=>x.status==="ABSENT").length,late:rows.filter(x=>x.status==="LATE").length,excused:rows.filter(x=>x.status==="EXCUSED").length};
  const rate=rows.length?Math.round(((counts.present+counts.late+counts.excused)/rows.length)*100):0;
  return <div className="page"><label>ATTENDANCE</label><h1>Attendance Management</h1><p>Attendance records from the live portal database.</p>
    <div className="metric-grid" style={{marginTop:24}}>
      <div className="metric"><span>ATTENDANCE RATE</span><strong>{rate}%</strong><small>Present, late and excused</small></div>
      <div className="metric"><span>PRESENT</span><strong>{counts.present}</strong><small>Recorded present</small></div>
      <div className="metric"><span>LATE</span><strong>{counts.late}</strong><small>Recorded late</small></div>
      <div className="metric"><span>ABSENT</span><strong>{counts.absent}</strong><small>Recorded absent</small></div>
    </div>
    <div className="surface" style={{marginTop:16}}><div className="section-head"><div><label>RECORDS</label><h2>Attendance history</h2></div><select value={status} onChange={e=>setStatus(e.target.value)}><option value="ALL">All statuses</option><option>PRESENT</option><option>LATE</option><option>EXCUSED</option><option>ABSENT</option></select></div>
      {loading?<p>Loading attendance...</p>:error?<p role="alert">{error}</p>:filtered.length===0?<p>No attendance records found.</p>:<div className="data-table"><div className="table-head"><span>Date</span><span>Intern</span><span>Status</span><span>Note</span></div>{filtered.slice(0,50).map(x=><div className="table-row" key={x.id}><span>{new Date(x.date).toLocaleDateString()}</span><span>{x.intern?.name||"—"}</span><span className="pill">{x.status}</span><span>{x.note||"—"}</span></div>)}</div>}
    </div>
  </div>
}
