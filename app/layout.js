export const metadata = {
  title: "VetMatch",
  description: "VetMatch MVP"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
