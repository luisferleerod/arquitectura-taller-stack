'use client';

export default function EditarSensor({ sensor, setSensor, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-8">
      <h3 className="text-3xl font-semibold text-center text-blue-600 mb-6">Editar Sensor</h3>
      
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-gray-700 font-semibold mb-2">Nombre</label>
        <input
          id="nombre"
          value={sensor.nombre}
          onChange={(e) => setSensor({ ...sensor, nombre: e.target.value })}
          placeholder="Nombre del sensor"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="tipo" className="block text-gray-700 font-semibold mb-2">Tipo</label>
        <select
          id="tipo"
          value={sensor.tipo}
          onChange={(e) => setSensor({ ...sensor, tipo: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Temperatura">Temperatura</option>
          <option value="Humedad">Humedad</option>
          <option value="Oxigeno">Oxígeno</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="estado" className="block text-gray-700 font-semibold mb-2">Estado</label>
        <select
          id="estado"
          value={sensor.estado}
          onChange={(e) => setSensor({ ...sensor, estado: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Actualizar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
