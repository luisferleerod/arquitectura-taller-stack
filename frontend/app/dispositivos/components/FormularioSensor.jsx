'use client';

export default function FormularioSensor({ nuevoSensor, setNuevoSensor, onGuardar, onCancelar }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Nuevo Sensor</h3>
      <input
        placeholder="Nombre"
        value={nuevoSensor.nombre}
        onChange={(e) => setNuevoSensor({ ...nuevoSensor, nombre: e.target.value })}
      />
      <select
        value={nuevoSensor.tipo}
        onChange={(e) => setNuevoSensor({ ...nuevoSensor, tipo: e.target.value })}
      >
        <option value="">Seleccione tipo</option>
        <option value="Humedad">Humedad</option>
        <option value="Oxigeno">Oxígeno</option>
        <option value="Temperatura">Temperatura</option>
      </select>
      <select
        value={nuevoSensor.estado}
        onChange={(e) => setNuevoSensor({ ...nuevoSensor, estado: e.target.value })}
      >
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>
      <button onClick={onGuardar}>Guardar</button>
      <button onClick={onCancelar}>Cancelar</button>
    </div>
  );
}
