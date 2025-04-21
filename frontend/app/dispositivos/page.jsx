'use client';

import { useState, useEffect } from "react";
import ListaSensores from "./components/ListaSensores";
import FormularioSensor from "./components/FormularioSensor";
import EditarSensor from "./components/EditarSensor";
import Link from "next/link";

export default function DispositivosPage() {
  const [sensores, setSensores] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [nuevoSensor, setNuevoSensor] = useState({ nombre: "", tipo: "", estado: "activo" });
  const [sensorEditar, setSensorEditar] = useState(null);

  const obtenerSensores = async () => {
    try {
      const response = await fetch("http://localhost:8000/lista-dispositivos/");
      if (!response.ok) throw new Error("Error al obtener los sensores");
      const data = await response.json();
      setSensores(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    obtenerSensores();
  }, []);

  const agregarSensor = async () => {
    if (!nuevoSensor.nombre || !nuevoSensor.tipo) {
      alert("Por favor completa nombre y tipo");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/agregar-dispositivo/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoSensor),
      });

      if (!res.ok) throw new Error("Error al agregar sensor");

      const data = await res.json();
      setSensores([...sensores, { ...nuevoSensor, id: data.id }]);
      setNuevoSensor({ nombre: "", tipo: "", estado: "activo" });
      setFormVisible(false);
    } catch (error) {
      console.error(error);
      alert("Error al agregar el sensor");
    }
  };

  const eliminarSensor = async (id) => {
    const confirm = window.confirm("¿Seguro que deseas eliminar este sensor?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:8000/eliminar-dispositivo/${id}/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar el sensor");

      setSensores(sensores.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error eliminando:", error);
      alert("Hubo un error al eliminar el sensor");
    }
  };

  const actualizarSensor = async (e) => {
    e.preventDefault();
    const { id, nombre, tipo, estado } = sensorEditar;

    try {
      const res = await fetch(`http://localhost:8000/actualizar-dispositivo/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, tipo, estado })
      });

      if (!res.ok) throw new Error('Error actualizando sensor');

      setSensores(sensores.map(s => (s.id === id ? sensorEditar : s)));
      setSensorEditar(null);
    } catch (err) {
      console.error(err);
      alert('Error al actualizar');
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Lista de Sensores</h1>

      <div className="flex justify-center mb-6">
        <button 
          onClick={() => setFormVisible(true)} 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mr-4"
        >
          + Agregar Sensor
        </button>
        <button 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <Link href="/lecturas">📈 Ver Lecturas</Link>
        </button>
      </div>

      {/* Formulario de agregar sensor */}
      {formVisible && (
        <FormularioSensor
          nuevoSensor={nuevoSensor}
          setNuevoSensor={setNuevoSensor}
          onGuardar={agregarSensor}
          onCancelar={() => setFormVisible(false)}
        />
      )}

      {/* Lista de sensores */}
      <ListaSensores
        sensores={sensores}
        onEditar={setSensorEditar}
        onEliminar={eliminarSensor}
      />

      {/* Formulario de editar sensor */}
      {sensorEditar && (
        <EditarSensor
          sensor={sensorEditar}
          setSensor={setSensorEditar}
          onSubmit={actualizarSensor}
          onCancel={() => setSensorEditar(null)}
        />
      )}
    </main>
  );
}
