// app/page.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

const sensoresMock = [
  {
    id: '1',
    nombre: 'Sensor Temperatura 1',
    tipo: 'temperatura',
    estado: 'activo',
  },
  {
    id: '2',
    nombre: 'Sensor Humedad 1',
    tipo: 'humedad',
    estado: 'activo',
  },
  {
    id: '3',
    nombre: 'Sensor Oxigeno 1',
    tipo: 'oxigeno',
    estado: 'inactivo',
  },
];

export default function HomePage() {
  const [sensores, setSensores] = useState(sensoresMock);

  const eliminarSensor = (id) => {
    const confirm = window.confirm('¿Seguro que deseas eliminar este sensor?');
    if (confirm) {
      setSensores(sensores.filter((s) => s.id !== id));
    }
  };

  return (
    <main>
      <h1>Lista de Sensores</h1>
      <button onClick={() => alert('Agregar nuevo sensor')}>+ Agregar Sensor</button>
      <button style={{ marginLeft: '10px' }}>
        <Link href="/lecturas">📈 Ver Lecturas</Link>
      </button>
      <ul>
        {sensores.map((sensor) => (
          <li key={sensor.id}>
            <strong>{sensor.nombre}</strong> ({sensor.tipo}) - {sensor.estado}
            <div>
              <button onClick={() => alert(`Ver ${sensor.nombre}`)}>Ver</button>
              <button onClick={() => alert(`Editar ${sensor.nombre}`)}>Editar</button>
              <button onClick={() => eliminarSensor(sensor.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
