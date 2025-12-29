"use client";
import { useEffect, useState } from "react";

export default function CompanyOpportunities() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: "", city: "", description: "" });

  useEffect(load, []);
  function load() {
    const token = localStorage.getItem("accessToken");
    fetch(`${apiUrl}/opportunities`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(d => setList(d.opportunities || []));
  }

  async function create(e) {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    await fetch(`${apiUrl}/opportunities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
    setForm({ title: "", city: "", description: "" });
    load();
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>My Opportunities</h1>

      <form onSubmit={create} style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <button>Create</button>
      </form>

      <ul style={{ marginTop: 20 }}>
        {list.map(o => (
          <li key={o.id}>{o.title} — {o.city}</li>
        ))}
      </ul>
    </main>
  );
}
