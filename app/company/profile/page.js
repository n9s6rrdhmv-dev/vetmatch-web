"use client";

import { useEffect, useState } from "react";

export default function CompanyProfilePage() {
  const [form, setForm] = useState({
    companyName: "",
    companyType: "CLINIC",
    city: "",
    description: ""
  });
  const [status, setStatus] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(`${apiUrl}/company/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.profile) {
          setForm({
            companyName: d.profile.companyName || "",
            companyType: d.profile.companyType || "CLINIC",
            city: d.profile.city || "",
            description: d.profile.description || ""
          });
        }
      })
      .catch(() => {});
  }, [apiUrl]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("saving");

    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${apiUrl}/company/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setStatus(res.ok ? "saved" : data?.error || "error");
  }

  function set(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 560 }}>
      <h1>Company Profile</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <label>
          Company name
          <input
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            value={form.companyName}
            onChange={(e) => set("companyName", e.target.value)}
            required
          />
        </label>

        <label>
          Company type
          <select
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            value={form.companyType}
            onChange={(e) => set("companyType", e.target.value)}
          >
            <option value="CLINIC">CLINIC</option>
            <option value="HOSPITAL">HOSPITAL</option>
            <option value="RANCH">RANCH</option>
            <option value="COMPANY">COMPANY</option>
            <option value="RECRUITER">RECRUITER</option>
          </select>
        </label>

        <label>
          City
          <input
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            required
          />
        </label>

        <label>
          Description (optional)
          <textarea
            style={{ width: "100%", padding: 10, marginTop: 6, minHeight: 100 }}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </label>

        <button style={{ padding: 12 }}>Save company profile</button>
      </form>

      <p style={{ marginTop: 12 }}>
        Status: <strong>{status}</strong>
      </p>

      <p style={{ marginTop: 12 }}>
        ← <a href="/dashboard">Back to dashboard</a>
      </p>
    </main>
  );
}
