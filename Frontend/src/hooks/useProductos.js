import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as productoService from '../services/productoService';
import * as categoriaService from '../services/categoriaService';
import * as loteService from '../services/loteService';

export const useProductos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', categoriaId: '' });
  const [mostrarStock, setMostrarStock] = useState(true);
  const [alertas, setAlertas] = useState([]);

  // --- TODA LA LÓGICA QUE TENÍAS EN APP.JSX SE MUEVE AQUÍ ---
  const cargarDatosIniciales = async () => {
    try {
      const [dataProductos, dataCategorias, dataLotes, dataAlertas] = await Promise.all([
        productoService.getProductos(),
        categoriaService.getCategorias(),
        loteService.getLotes(),
        loteService.getAlertasVencimiento(7)
      ]);
      setProductos(dataProductos);
      setCategorias(dataCategorias);
      setLotes(dataLotes);
      setAlertas(dataAlertas);
    } catch (err) {
      console.error("Error al cargar datos:", err);
    }
  };

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => setMostrarStock(prev => !prev), 5000);
    return () => clearInterval(intervalo);
  }, []);

  const manejarCambioCategoria = async (newValue) => {
    if (!newValue) {
      setNuevoProducto(prev => ({ ...prev, categoriaId: '' }));
      return;
    }
    if (newValue.__isNew__) {
      const nuevaCat = await categoriaService.saveCategoria(newValue.label.toUpperCase());
      setCategorias(prev => [...prev, nuevaCat]);
      setNuevoProducto(prev => ({ ...prev, categoriaId: nuevaCat.id }));
    } else {
      setNuevoProducto(prev => ({ ...prev, categoriaId: newValue.value }));
    }
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    const payload = {
      nombre: nuevoProducto.nombre,
      categoria: { id: parseInt(nuevoProducto.categoriaId) }
    };
    try {
      await productoService.saveProducto(payload);
      await cargarDatosIniciales(); // Recargamos para ver el nuevo
      setNuevoProducto({ nombre: '', categoriaId: '' });
      navigate('/inventario');
    } catch (error) {
      alert('Error al guardar');
    }
  };

  const manejarCambio = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const guardarLote = async (datosFormulario) => {
    try {
      // Transformamos la fecha para añadirle la parte del tiempo T00:00:00
      // Si el input date te da "2026-03-15", esto lo convierte en "2026-03-15T00:00:00"
      const payload = {
        ...datosFormulario,
        fechaVencimiento: `${datosFormulario.fechaVencimiento}T00:00:00`
      };

      console.log("Enviando al back:", payload); // Para que verifiques en consola

      await loteService.saveLote(payload);
      await cargarDatosIniciales();
      alert("¡Lote registrado correctamente!");
    } catch (error) {
      console.error("Error al guardar lote:", error);
      alert("Hubo un error al guardar el lote. Revisa el formato de los datos.");
    }
  };

  const productosBajoStock = productos.filter(p => {
    // Sumamos las cantidades de todos los lotes de este producto
    const stockTotal = lotes
      .filter(l => l.producto.id === p.id)
      .reduce((acc, current) => acc + current.cantidad, 0);
    return stockTotal < 10; // Umbral de ejemplo
  }).length;

  // EXPORTAMOS TODO LO QUE LOS COMPONENTES NECESITEN
  return {
    productos,
    categorias,
    nuevoProducto,
    mostrarStock,
    manejarCambio,
    manejarCambioCategoria,
    guardarProducto,
    lotes,
    guardarLote,
    productosBajoStock,
    alertas
  };
};