"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Test12345!");
  const [role, setRole] = useState("VET");
  const [country, setCountry] = useState("MX");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role, country })
      });

      const data = await res.json();
      setResult({ status: res.status, data });

      // Guardar token en localStorage (MVP)
      if (res.ok && data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userEmail", data?.user?.email || "");
      }
    } catch (err) {
      setResult({ error: String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 520 }}>
      <h1>Register — VetMatch</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <label>
          Email
          <input
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
        </label>

        <label>
          Password
          <input
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </label>

        <label>
          Role
          <select
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="VET">VET</option>
            <option value="COMPANY">COMPANY</option>
          </select>
        </label>

        <label>
          Country
          <select
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="MX">MX</option>
            <option value="US">US</option>
          </select>
        </label>

        <button disabled={loading} style={{ padding: 12 }}>
          {loading ? "Registering..." : "Create account"}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        ¿Ya tienes cuenta? <a href="/login">Login</a>
      </p>

      <h2 style={{ marginTop: 20 }}>Result</h2>
      <pre style={{ background: "#f4f4f4", padding: 12, borderRadius: 8, overflowX: "auto" }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </main>
  );
}
