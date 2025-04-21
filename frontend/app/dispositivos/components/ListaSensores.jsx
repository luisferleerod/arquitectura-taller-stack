'use client';

export default function ListaSensores({ sensores, onEditar, onEliminar }) {
  return (
    <div className="space-y-4">
      {sensores.map((sensor) => (
        <div key={sensor.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{sensor.nombre}</h3>
            <p className="text-gray-600">{sensor.tipo} - <span className={`font-semibold ${sensor.estado === 'activo' ? 'text-green-500' : 'text-red-500'}`}>{sensor.estado}</span></p>
          </div>
          <div className="space-x-3">
            <button
              onClick={() => onEditar(sensor)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Editar
            </button>
            <button
              onClick={() => onEliminar(sensor.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
