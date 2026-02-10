import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({nombre: '', categoria: ''});
  const [categorias, setCategorias] = useState([])

  const cargarCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categorias');
      setCategorias(response.data);
    } catch (err) {
      console.error('Error al cargar categorias:', err);
      setError('No se pudo conectar con el servidor')
    }
  };

  // Función para obtener productos del Backend
  const cargarProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/productos');
      setProductos(response.data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("No se pudo conectar con el servidor");
    }
  };

  useEffect(() => {
    cargarCategorias();
    cargarProductos();
  }, []);

  const manejarCambio = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value
    });
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    const payload = {
      nombre: nuevoProducto.nombre,
      categoria: {
        id: parseInt(nuevoProducto.categoriaId)
      }
    };
    try {
      await axios.post('http://localhost:8080/api/productos', payload);
      setNuevoProducto({nombre: '', categoria: ''});
      cargarProductos();
    } catch (error) {
      console.error('Detalle del error:', error.response.data);
      alert('Error al guardar el producto');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>📦 Inventario EcoTrack</h1>

      {/* --- FORMULARIO --- */}
      <form onSubmit={guardarProducto} style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#a09e9e', borderRadius: '8px' }}>
        <h3>Agregar Nuevo Producto</h3>
        <input 
          name="nombre" 
          placeholder="Nombre del producto" 
          value={nuevoProducto.nombre} 
          onChange={manejarCambio} 
          required 
        />
        <select
          name="categoriaId" 
          value={nuevoProducto.categoriaId}
          onChange={manejarCambio}
          required
        >
          <option value="">Selecciona una categoria</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
        <button type="submit" style={{ marginLeft: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 15px', cursor: 'pointer' }}>
          Guardar
        </button>
      </form>

      {/* --- TABLA --- */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#a09e9e' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Nombre</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{p.nombre}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{p.categoria ? p.categoria.nombre : 'Sin categoria'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;