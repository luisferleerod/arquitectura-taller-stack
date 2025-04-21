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
    <main className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Lecturas de Sensores</h1>

      <div className="mb-6 text-center">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          <Link href="/">⬅ Volver a Sensores</Link>
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-600 font-semibold">Cargando lecturas...</p>
      )}

      {error && (
        <p className="text-center text-red-600 font-semibold">Error: {error}</p>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto mt-8">
          <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Dispositivo ID</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Valor</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {lecturas.length > 0 ? (
                lecturas.map((lectura, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3 text-center">{lectura.dispositivo_id}</td>
                    <td className="px-6 py-3 text-center">{lectura.valor}</td>
                    <td className="px-6 py-3 text-center">{lectura.timestamp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500 py-6">
                    No hay lecturas disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
