// app/components/navbar.jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/">🏠 Inicio</Link> |{' '}
      <Link href="/lecturas">📈 Lecturas</Link>
    </nav>
  );
}
