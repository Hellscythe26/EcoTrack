import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InventarioPage from './pages/InventarioPage';
import { useProductos } from './hooks/useProductos';

function App() {
  const {
    productos,
    categorias,
    nuevoProducto,
    mostrarStock,
    manejarCambio,
    manejarCambioCategoria,
    guardarProducto,
    guardarLote,
    productosBajoStock,
    alertas,
    todosLosLotes,
    eliminarProducto,
    eliminarLote
  } = useProductos();
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={
            <Dashboard
              totalProductos={productos.length}
              totalCategorias={categorias.length}
              mostrarStock={mostrarStock}
              productosBajoStock={productosBajoStock}
              alertas={alertas}
            />
          } />
          <Route path="/inventario" element={
            <InventarioPage
              productos={productos}
              alertas={alertas}
              categorias={categorias}
              nuevoProducto={nuevoProducto}
              manejarCambio={manejarCambio}
              manejarCambioCategoria={manejarCambioCategoria}
              guardarProducto={guardarProducto}
              guardarLote={guardarLote}
              todosLosLotes={todosLosLotes}
              onEliminarProducto={eliminarProducto}
              onEliminarLote={eliminarLote}
            />
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;