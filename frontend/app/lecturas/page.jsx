'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LecturasPage() {
  const [lecturas, setLecturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const obtenerLecturas = async () => {
    try {
      console.log('Iniciando solicitud a lista-lecturas...');
      const response = await fetch('http://localhost:8000/lista-lecturas/');
      console.log('Respuesta recibida:', response);
      if (!response.ok) {
        throw new Error(`Error al obtener las lecturas: ${response.status}`);
      }
      const data = await response.json();
      console.log('Datos recibidos:', data); // <--- Este log mostrará los datos
      setLecturas(data);
      setLoading(false);
    } catch (error) {
      console.error('Error en obtenerLecturas:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerLecturas();
  }, []);

  return (
    <main>
      <h1>Lecturas de Sensores</h1>
      <button>
        <Link href="/">⬅ Volver a Sensores</Link>
      </button>
      {loading && <p>Cargando lecturas...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Dispositivo ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Valor</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {lecturas.length > 0 ? (
              lecturas.map((lectura, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lectura.dispositivo_id}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lectura.valor}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lectura.timestamp}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '8px' }}>
                  No hay lecturas disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </main>
  );
}