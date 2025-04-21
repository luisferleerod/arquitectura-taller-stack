'use client';

export default function ListaSensores({ sensores, onEditar, onEliminar }) {
  return (
    <ul>
      {sensores.map((sensor) => (
        <li key={sensor.id}>
          <strong>{sensor.nombre}</strong> ({sensor.tipo}) - {sensor.estado}
          <div>
            <button onClick={() => onEditar(sensor)}>Editar</button>
            <button onClick={() => onEliminar(sensor.id)}>Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
