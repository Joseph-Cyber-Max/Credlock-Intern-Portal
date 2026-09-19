"use client";

import { useEffect, useMemo, useState } from "react";

type Intern = {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  progress: number;
  quizAverage: number;
  modulesCompleted: number;
  projects: number;
};

export default function InternDirectory() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/interns")
      .then(async (res) => {
        if (!res.ok) throw new Error("Unable to load interns.");
        return res.json();
      })
      .then(setInterns)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const departments = useMemo(
    () => ["ALL", ...Array.from(new Set(interns.map((i) => i.department || "Unassigned")))],
    [interns]
  );

  const filtered = interns.filter((intern) => {
    const text = query.toLowerCase();
    const matchesText =
      !text ||
      intern.name.toLowerCase().includes(text) ||
      intern.email.toLowerCase().includes(text);
    const matchesDepartment =
      department === "ALL" || (intern.department || "Unassigned") === department;
    return matchesText && matchesDepartment;
  });

  return (
    <div className="page">
      <label>INTERN MANAGEMENT</label>
      <h1>Intern Directory</h1>
      <p>Search and review interns registered in the Credlock internship portal.</p>

      <div className="card" style={{ marginTop: 24 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <input
            aria-label="Search interns"
            placeholder="Search by name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, minWidth: 240 }}
          />
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            {departments.map((item) => (
              <option key={item} value={item}>
                {item === "ALL" ? "All departments" : item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16, overflowX: "auto" }}>
        {loading ? (
          <p>Loading interns...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : filtered.length === 0 ? (
          <p>No interns match the current filters.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th align="left">Intern</th>
                <th align="left">Department</th>
                <th align="left">Progress</th>
                <th align="left">Quiz Average</th>
                <th align="left">Modules</th>
                <th align="left">Projects</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((intern) => (
                <tr key={intern.id}>
                  <td style={{ padding: "14px 8px" }}>
                    <strong>{intern.name}</strong>
                    <div>{intern.email}</div>
                  </td>
                  <td>{intern.department || "Unassigned"}</td>
                  <td>{intern.progress}%</td>
                  <td>{intern.quizAverage}%</td>
                  <td>{intern.modulesCompleted}/12</td>
                  <td>{intern.projects}/5</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
