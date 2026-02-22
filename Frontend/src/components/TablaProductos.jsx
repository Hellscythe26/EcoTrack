import React from 'react';

const TablaProductos = ({ productos, onEliminar }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="p-4 font-bold text-gray-600 uppercase text-xs tracking-wider">Producto</th>
            <th className="p-4 font-bold text-gray-600 uppercase text-xs tracking-wider">Categoría</th>
            <th className="p-4 font-bold text-gray-600 uppercase text-xs tracking-wider">Stock Disponible</th>
            <th className="p-4 font-bold text-gray-600 uppercase text-xs tracking-wider text-right">Estado</th>
            <th className="p-4 text-xs font-bold text-gray-600 uppercase text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="p-4">
                <div className="font-semibold text-gray-900">{p.nombre}</div>
                <div className="text-xs text-gray-400">ID: #{p.id}</div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold uppercase tracking-wide">
                  {p.categoria?.nombre || 'Sin categoría'}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className={`text-base font-extrabold ${p.stock <= 5 ? 'text-red-600' : 'text-gray-700'}`}>
                    {p.stockTotal}
                  </span>
                  <span className="text-gray-400 text-xs">unidades</span>
                </div>
              </td>
              <td className="p-4 text-right">
                {p.stockTotal <= 5 ? (
                  <span className="text-red-500 text-xs font-bold animate-pulse">● Stock Bajo</span>
                ) : (
                  <span className="text-green-500 text-xs font-bold">● Estable</span>
                )}
              </td>
              <td className="p-4 text-center">
                <button
                  onClick={() => onEliminar(p.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                  title="Eliminar producto"
                >
                  <span className="text-xl">🗑️</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {productos.length === 0 && (
        <div className="p-10 text-center text-gray-400">
          No hay productos registrados en el sistema.
        </div>
      )}
    </div>
  );
};

export default TablaProductos;