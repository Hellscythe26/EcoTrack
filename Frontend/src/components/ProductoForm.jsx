import React from 'react';
import CreatableSelect from 'react-select/creatable';

const ProductoForm = ({ nuevoProducto, manejarCambio, categorias, manejarCambioCategoria, guardarProducto }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Agregar Nuevo Producto</h3>
      <form onSubmit={guardarProducto} className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1">Nombre del Producto</label>
          <input
            name="nombre"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder="Ej. Laptop Dell"
            value={nuevoProducto.nombre}
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1">Categoría</label>
          <div className="text-black">
            <CreatableSelect
              isClearable
              placeholder="Seleccionar..."
              options={categorias.map(cat => ({ value: Number(cat.id), label: cat.nombre }))}
              onChange={manejarCambioCategoria}
              value={nuevoProducto.categoriaId ? {
                value: Number(nuevoProducto.categoriaId),
                label: categorias.find(c => Number(c.id) === Number(nuevoProducto.categoriaId))?.nombre
              } : null}
              formatCreateLabel={(val) => `Crear "${val.toUpperCase()}"`}
              styles={{
                control: (base) => ({
                  ...base,
                  padding: '2px',
                  borderRadius: '0.5rem',
                  borderColor: '#d1d5db'
                })
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md w-full md:w-auto"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default ProductoForm;