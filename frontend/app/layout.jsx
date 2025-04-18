import Navbar from './components/navbar';  // Verifica la ruta del componente

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />  {/* Esto debe funcionar si Navbar está exportado correctamente */}
        <main>{children}</main>
      </body>
    </html>
  );
}
