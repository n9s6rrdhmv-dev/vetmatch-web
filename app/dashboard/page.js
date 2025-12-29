"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(`${apiUrl}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => r.json().then((d) => ({ ok: r.ok, d })))
      .then(({ ok, d }) => {
        if (!ok) throw new Error(d?.error || "Unauthorized");
        setMe(d);
      })
      .catch((e) => setError(String(e)));
  }, []);

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 720 }}>
      <h1>Dashboard</h1>
  <p>
  <a href="/vet/profile">Edit Vet Profile</a>
</p>

      <p>Si ves tu info aquí, ya quedó autenticación end-to-end ✅</p>

      <button onClick={logout} style={{ padding: 10, marginTop: 12 }}>
        Logout
      </button>

      <h2 style={{ marginTop: 20 }}>Me</h2>
      <pre style={{ background: "#f4f4f4", padding: 12, borderRadius: 8, overflowX: "auto" }}>
        {JSON.stringify({ me, error }, null, 2)}
      </pre>
    </main>
  );
}
