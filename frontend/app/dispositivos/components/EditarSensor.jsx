'use client';

export default function EditarSensor({ sensor, setSensor, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit}>
      <h3>Editar Sensor</h3>
      <input
        value={sensor.nombre}
        onChange={(e) => setSensor({ ...sensor, nombre: e.target.value })}
        placeholder="Nombre"
      />
      <select
        value={sensor.tipo}
        onChange={(e) => setSensor({ ...sensor, tipo: e.target.value })}
      >
        <option value="Temperatura">Temperatura</option>
        <option value="Humedad">Humedad</option>
        <option value="Oxigeno">Oxígeno</option>
      </select>

      <select
        value={sensor.estado}
        onChange={(e) => setSensor({ ...sensor, estado: e.target.value })}
      >
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>

      <button type="submit">Actualizar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}
