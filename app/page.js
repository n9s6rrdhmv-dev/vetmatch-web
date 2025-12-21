export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  let health = null;
  try {
    const res = await fetch(`${apiUrl}/health`, { cache: "no-store" });
    health = await res.json();
  } catch (e) {
    health = { ok: false, error: "API not reachable yet" };
  }

  return (
    <main style={{ fontFamily: "system-ui", padding: 24, maxWidth: 720 }}>
      <h1>VetMatch</h1>
      <p>MVP en construcción (MX + US).</p>

      <h2>API Health</h2>
      <pre style={{ background: "#f4f4f4", padding: 12, borderRadius: 8 }}>
        {JSON.stringify({ apiUrl, health }, null, 2)}
      </pre>

      <p style={{ marginTop: 16, opacity: 0.7 }}>
        Si “API not reachable yet”, revisa que Render ya esté desplegado y que el DNS haya propagado.
      </p>
    </main>
  );
}
