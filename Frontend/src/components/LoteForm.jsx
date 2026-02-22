import React, { useState } from 'react';
import Select from 'react-select';

const LoteForm = ({ productos, guardarLote }) => {
    const [nuevoLote, setNuevoLote] = useState({
        cantidad: '',
        fechaVencimiento: '',
        productoId: ''
    });

    const opcionesProductos = productos.map(p => ({ value: p.id, label: p.nombre }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const datosParaEnviar = {
            producto: { id: parseInt(nuevoLote.productoId) },
            cantidad: parseInt(nuevoLote.cantidad),
            fechaVencimiento: nuevoLote.fechaVencimiento
        };
        guardarLote(datosParaEnviar);
        setNuevoLote({ cantidad: '', fechaVencimiento: '', productoId: '' });
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
            <div>
                <label className="block text-sm font-semibold mb-1">Producto</label>
                <Select
                    options={opcionesProductos}
                    placeholder="Selecciona un producto..."
                    value={opcionesProductos.find(opt => opt.value === nuevoLote.productoId) || null}
                    onChange={(opt) => setNuevoLote({ ...nuevoLote, productoId: opt ? opt.value : '' })}
                    isClearable
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Cantidad</label>
                    <input
                        type="number"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        value={nuevoLote.cantidad}
                        onChange={(e) => setNuevoLote({ ...nuevoLote, cantidad: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Fecha de Vencimiento</label>
                    <input
                        type="date"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        value={nuevoLote.fechaVencimiento}
                        onChange={(e) => setNuevoLote({ ...nuevoLote, fechaVencimiento: e.target.value })}
                        required
                    />
                </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-all">
                Registrar Entrada
            </button>
        </form>
    );
};

export default LoteForm;