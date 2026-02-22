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
  const [todosLosLotes, setTodosLosLotes] = useState([]);

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

  const cargarTodosLosLotes = async () => {
    try {
      const respuesta = await fetch("http://localhost:8080/api/lotes");
      const datos = await respuesta.json();
      setTodosLosLotes(datos);
    } catch (error) {
      console.error("Error al cargar todos los lotes:", error);
    }
  };

  useEffect(() => {
    cargarDatosIniciales();
    cargarTodosLosLotes();
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
      await cargarDatosIniciales();
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
      const payload = {
        ...datosFormulario,
        fechaVencimiento: `${datosFormulario.fechaVencimiento}T00:00:00`
      };
      await loteService.saveLote(payload);
      await cargarDatosIniciales();
      alert("¡Lote registrado correctamente!");
    } catch (error) {
      console.error("Error al guardar lote:", error);
      alert("Hubo un error al guardar el lote. Revisa el formato de los datos.");
    }
  };

  const productosBajoStock = productos.filter(p => {
    const stockTotal = lotes
      .filter(l => l.producto.id === p.id)
      .reduce((acc, current) => acc + current.cantidad, 0);
    return stockTotal < 10;
  }).length;

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro?")) return;
    try {
      const respuesta = await fetch(`http://localhost:8080/api/productos/${id}`, {
        method: 'DELETE',
      });
      if (respuesta.ok) {
        setProductos(prevProductos =>
          prevProductos.filter(p => p.id !== id)
        );
        setAlertas(prevAlertas =>
          prevAlertas.filter(alerta => alerta.producto.id !== id)
        );
        alert("Producto y sus lotes eliminados correctamente");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const eliminarLote = async (loteId) => {
    if (!window.confirm("¿Deseas eliminar este lote de forma permanente?")) return;
    try {
      const respuesta = await fetch(`http://localhost:8080/api/lotes/${loteId}`, {
        method: 'DELETE',
      });
      if (respuesta.ok) {
        setAlertas(prev => prev.filter(l => l.id !== loteId));
        cargarDatosIniciales();
      }
    } catch (error) {
      console.error("Error al eliminar el lote:", error);
    }
  };

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
    alertas,
    todosLosLotes,
    cargarTodosLosLotes,
    eliminarProducto,
    eliminarLote
  };
};