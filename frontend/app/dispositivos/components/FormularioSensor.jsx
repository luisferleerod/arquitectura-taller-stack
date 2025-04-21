'use client';

export default function FormularioSensor({ nuevoSensor, setNuevoSensor, onGuardar, onCancelar }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-8">
      <h3 className="text-3xl font-semibold text-center text-blue-600 mb-6">Nuevo Sensor</h3>
      
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-gray-700 font-semibold mb-2">Nombre</label>
        <input
          id="nombre"
          placeholder="Nombre del sensor"
          value={nuevoSensor.nombre}
          onChange={(e) => setNuevoSensor({ ...nuevoSensor, nombre: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="tipo" className="block text-gray-700 font-semibold mb-2">Tipo</label>
        <select
          id="tipo"
          value={nuevoSensor.tipo}
          onChange={(e) => setNuevoSensor({ ...nuevoSensor, tipo: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione tipo</option>
          <option value="Humedad">Humedad</option>
          <option value="Oxigeno">Oxígeno</option>
          <option value="Temperatura">Temperatura</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="estado" className="block text-gray-700 font-semibold mb-2">Estado</label>
        <select
          id="estado"
          value={nuevoSensor.estado}
          onChange={(e) => setNuevoSensor({ ...nuevoSensor, estado: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onGuardar}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
