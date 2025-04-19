// navbar.jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#0070f3', color: 'white' }}>
      <Link href="/">Inicio</Link> |{' '}
      <Link href="/dispositivos">Dispositivos</Link> |{' '}
      <Link href="/lecturas">Lecturas</Link> |{' '}

    </nav>
  );
}
