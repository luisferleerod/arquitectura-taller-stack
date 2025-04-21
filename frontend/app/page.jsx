'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [sensores, setSensores] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [nuevoSensor, setNuevoSensor] = useState({
    nombre: "",
    tipo: "",
    estado: "activo",
  });
  const [sensorEditar, setSensorEditar] = useState(null); // estado para edición

  const obtenerSensores = async () => {
    try {
      const response = await fetch("http://localhost:8000/lista-dispositivos/");
      if (!response.ok) {
        throw new Error("Error al obtener los sensores");
      }
      const data = await response.json();
      setSensores(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    obtenerSensores();
  }, []);

  // 🧩 Aquí van tus funciones de edición
  const editarSensor = (sensor) => {
    setSensorEditar(sensor); // carga los datos en el formulario
  };

  const actualizarSensor = async (e) => {
    e.preventDefault();
    const { id, nombre, tipo, estado } = sensorEditar;

    try {
      const res = await fetch(`http://localhost:8000/actualizar-dispositivo/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
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

  const eliminarSensor = async (id) => {
    const confirm = window.confirm("¿Seguro que deseas eliminar este sensor?");
    if (!confirm) return;

    try {
      const res = await fetch(
        `http://localhost:8000/eliminar-dispositivo/${id}/`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Error al eliminar el sensor");

      setSensores(sensores.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error eliminando:", error);
      alert("Hubo un error al eliminar el sensor");
    }
  };

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

  return (
    <main>
      <h1>Lista de Sensores</h1>
      <button onClick={() => setFormVisible(true)}>+ Agregar Sensor</button>
      <button style={{ marginLeft: "10px" }}>
        <Link href="/lecturas">📈 Ver Lecturas</Link>
      </button>
      {formVisible && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Nuevo Sensor</h3>
          <input
            placeholder="Nombre"
            value={nuevoSensor.nombre}
            onChange={(e) =>
              setNuevoSensor({ ...nuevoSensor, nombre: e.target.value })
            }
          />
          <select
            value={nuevoSensor.tipo}
            onChange={(e) =>
              setNuevoSensor({ ...nuevoSensor, tipo: e.target.value })
            }
          >
            <option value="Humedad">Humedad</option>
            <option value="Oxigeno">Oxigeno</option>
            <option value="Temperatura">Temperatura</option>
          </select>
          <select
            value={nuevoSensor.estado}
            onChange={(e) =>
              setNuevoSensor({ ...nuevoSensor, estado: e.target.value })
            }
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
          <button onClick={agregarSensor}>Guardar</button>
          <button onClick={() => setFormVisible(false)}>Cancelar</button>
        </div>
      )}
      <ul>
        {sensores.map((sensor) => (
          <li key={sensor.id}>
            <strong>{sensor.nombre}</strong> ({sensor.tipo}) - {sensor.estado}
            <div>
              <button onClick={() => editarSensor(sensor)}>Editar</button>
              <button onClick={() => eliminarSensor(sensor.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Formulario de edición */}
      {sensorEditar && (
        <form onSubmit={actualizarSensor}>
          <h3>Editar Sensor</h3>
          <input
            value={sensorEditar.nombre}
            onChange={(e) => setSensorEditar({ ...sensorEditar, nombre: e.target.value })}
            placeholder="Nombre"
          />
          <select
            value={sensorEditar.tipo}
            onChange={(e) => setSensorEditar({ ...sensorEditar, tipo: e.target.value })}
          >
            <option value="Temperatura">Temperatura</option>
            <option value="Humedad">Humedad</option>
            <option value="Oxigeno">Oxígeno</option>
          </select>

          <select
            value={sensorEditar.estado}
            onChange={(e) => setSensorEditar({ ...sensorEditar, estado: e.target.value })}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          <button type="submit">Actualizar</button>
          <button type="button" onClick={() => setSensorEditar(null)}>Cancelar</button>
        </form>
      )}
    </main>
  );
}
