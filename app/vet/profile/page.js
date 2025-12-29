"use client";

import { useEffect, useState } from "react";

export default function VetProfilePage() {
  const [form, setForm] = useState({
    specialty: "",
    experienceYears: "",
    city: "",
    availability: "FULL_TIME"
  });
  const [status, setStatus] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(`${apiUrl}/vet/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.profile) {
          setForm({
            specialty: d.profile.specialty || "",
            experienceYears: d.profile.experienceYears || "",
            city: d.profile.city || "",
            availability: d.profile.availability || "FULL_TIME"
          });
        }
      })
      .catch(() => {});
  }, [apiUrl]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("saving");

    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${apiUrl}/vet/profile`, {
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
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 520 }}>
      <h1>Vet Profile</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <label>
          Specialty
          <input
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            value={form.specialty}
            onChange={(e) => set("specialty", e.target.value)}
            required
          />
        </label>

        <label>
          Experience (years)
          <input
            type="number"
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            value={form.experienceYears}
            onChange={(e) => set("experienceYears", e.target.value)}
          />
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
          Availability
          <select
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            value={form.availability}
            onChange={(e) => set("availability", e.target.value)}
          >
            <option value="FULL_TIME">FULL_TIME</option>
            <option value="PART_TIME">PART_TIME</option>
            <option value="LOCUM">LOCUM</option>
            <option value="PROJECT">PROJECT</option>
          </select>
        </label>

        <button style={{ padding: 12 }}>Save profile</button>
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
