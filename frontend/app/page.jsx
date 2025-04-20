'use client';  // Necesario para usar hooks en Next.js

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [sensores, setSensores] = useState([]);

  // Función para obtener sensores desde el backend
  const obtenerSensores = async () => {
    try {
      const response = await fetch('http://localhost:8000/lista-dispositivos/');
      if (!response.ok) {
        throw new Error('Error al obtener los sensores');
      }
      const data = await response.json();
      setSensores(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Llamar a la API cuando el componente se monte
  useEffect(() => {
    obtenerSensores();  // Llamada a la API cuando el componente se monta
  }, []);

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
