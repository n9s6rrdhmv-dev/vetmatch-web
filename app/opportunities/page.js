"use client";
import { useEffect, useState } from "react";

export default function VetOpportunities() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [list, setList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    fetch(`${apiUrl}/opportunities`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(d => setList(d.opportunities || []));
  }, []);

  async function apply(id) {
    const token = localStorage.getItem("accessToken");
    await fetch(`${apiUrl}/opportunities/${id}/apply`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Applied");
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Opportunities</h1>
      <ul>
        {list.map(o => (
          <li key={o.id} style={{ marginBottom: 8 }}>
            <strong>{o.title}</strong> — {o.city}
            <button style={{ marginLeft: 8 }} onClick={() => apply(o.id)}>Apply</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
