import { useEffect, useState } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({nombre: '', categoriaId: ''});
  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categorias');
      setCategorias(response.data);
    } catch (err) {
      console.error('Error al cargar categorias:', err);
      setError('No se pudo conectar con el servidor')
    }
  };

  const manejarCambioCategoria = async (newValue) => {
    // Caso 1: El usuario borró la selección (le dio a la "x")
    if (!newValue) {
      setNuevoProducto(prev => ({ ...prev, categoriaId: '' }));
      return;
    }
    // Caso 2: El usuario escribió algo nuevo y le dio a "Create..."
    if (newValue.__isNew__) {
      try {
        const res = await axios.post('http://localhost:8080/api/categorias', {
          nombre: newValue.label.toUpperCase()
        });
        const nuevaCat = res.data;
        setCategorias(prev => [...prev , nuevaCat]); // Actualizamos la lista global
        setNuevoProducto(prev => ({ ...prev, categoriaId: nuevaCat.id })); // La seleccionamos
      } catch (err) {
        console.error("Error al crear la nueva categoría: ", err);
        alert("No se pudo crear la categoria");
      }
    }
    // Caso 3: El usuario seleccionó una categoría que ya existía
    else {
      setNuevoProducto(prev => ({...prev, categoriaId: newValue.value }));
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
    if (!nuevoProducto.categoriaId) {
      alert("Por favor selecciona o crea una categoría primero");
      return;
    }
    const categoriaSeleccionada = categorias.find(c => Number(c.id) === Number(nuevoProducto.categoriaId));
    const payload = {
      nombre: nuevoProducto.nombre,
      categoria: { id: parseInt(nuevoProducto.categoriaId) }
    };
    try {
      const response = await axios.post('http://localhost:8080/api/productos', payload);
      const productoParaLaLista = {
        ...response.data,
        categoria: response.data.categoria?.nombre
          ? response.data.categoria
          : { id: nuevoProducto.categoriaId, nombre: categoriaSeleccionada?.nombre }
      };
      setProductos(prevProductos => [...prevProductos, productoParaLaLista]);
      setNuevoProducto({nombre: '', categoriaId: ''})
      alert('¡Producto guardado exitosamente!')
      // Limpiar formulario...
    } catch (error) {
      console.error('Error al guardar:', error.response?.data);
      alert('Error al guardar el producto')
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
        <div style={{ width: '300px', display: 'inline-block', marginLeft: '10px', verticalAlign: 'middle', color: 'black' }}>
          <CreatableSelect
            isClearable
            placeholder="Escribe para buscar o crear..."
            // Transformamos nuestras categorías al formato {value, label} que pide la librería
            options={categorias.map(cat => ({
              value: Number(cat.id),
              label: cat.nombre
            }))}
            // Usamos la nueva función que creamos en el paso anterior
            onChange={manejarCambioCategoria}
            // Para que el select muestre lo que está seleccionado en el estado
            value={
              nuevoProducto.categoriaId
                ? {
                  value: Number(nuevoProducto.categoriaId), 
                  label: categorias.find(c => Number(c.id) === Number(nuevoProducto.categoriaId))?.nombre
                }
                : null
            }
            // Mensaje que sale cuando vas a crear algo nuevo
            formatCreateLabel={(inputValue) => `Crear categoría "${inputValue.toUpperCase()}"`}
          />
        </div>
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
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{p.categoria?.nombre || 'Sin categoria'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;