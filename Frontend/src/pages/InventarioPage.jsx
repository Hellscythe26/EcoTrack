import { Link, useSearchParams } from "react-router-dom"; // Unión de imports
import ProductoForm from "../components/ProductoForm";
import TablaProductos from "../components/TablaProductos";
import LoteForm from '../components/LoteForm';
import { useProductos } from "../hooks/useProductos";

const InventarioPage = ({
    nuevoProducto, manejarCambio, categorias, manejarCambioCategoria, guardarProducto, guardarLote
}) => {
    // Obtenemos los datos del hook
    const { productos, alertas, cargando } = useProductos();
    const [searchParams] = useSearchParams();

    const filtro = searchParams.get('filtro');

    let productosFiltrados = productos;

    if (filtro === 'bajo') {
        productosFiltrados = productos.filter(p => p.stockTotal <= 5);
    } else if (filtro === 'vencimiento') {
        // Extraemos los IDs únicos de productos que tienen alertas de vencimiento
        const idsConVencimiento = [...new Set(alertas.map(a => a.producto.id))];
        productosFiltrados = productos.filter(p => idsConVencimiento.includes(p.id));
    }

    if (cargando) return (
        <div className="p-10 text-center font-bold text-blue-600 animate-pulse">
            Cargando inventario...
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Centro de Inventario</h2>
                    {filtro === 'bajo' && (
                        <p className="text-red-500 font-medium">⚠️ Mostrando solo stock bajo</p>
                    )}
                </div>
                <Link to="/" className="text-gray-500 hover:text-gray-800 transition-colors">
                    ← Volver al Dashboard
                </Link>
            </div>

            {/* Formularios */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-6 text-green-600">
                        <span className="text-2xl">📦</span>
                        <h3 className="text-lg font-bold text-gray-800">Definir Nuevo Producto</h3>
                    </div>
                    <ProductoForm
                        nuevoProducto={nuevoProducto}
                        manejarCambio={manejarCambio}
                        categorias={categorias}
                        manejarCambioCategoria={manejarCambioCategoria}
                        guardarProducto={guardarProducto}
                    />
                </section>

                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 border-t-4 border-t-blue-500">
                    <div className="flex items-center gap-2 mb-6 text-blue-600">
                        <span className="text-2xl">🚚</span>
                        <h3 className="text-lg font-bold text-gray-800">Registrar Entrada (Lote)</h3>
                    </div>
                    <LoteForm
                        productos={productos} // Lista completa para el select
                        guardarLote={guardarLote}
                    />
                </section>

                {/* Tabla con la lista filtrada */}
                <section className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                        <h3 className="font-bold text-gray-700 uppercase text-sm tracking-widest">
                            {filtro === 'vencimiento' ? '⏰ Lotes Próximos a Vencer' : 'Existencias en Almacén'}
                        </h3>
                        {filtro && (
                            <Link to="/inventario" className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300">
                                Ver Inventario General ×
                            </Link>
                        )}
                    </div>

                    {filtro === 'vencimiento' ? (
                        /* TABLA DE LOTES (Solo se ve cuando activas la alerta) */
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-orange-50 border-b border-orange-100">
                                        <th className="p-4 text-xs font-bold text-orange-700 uppercase">Producto</th>
                                        <th className="p-4 text-xs font-bold text-orange-700 uppercase">Cantidad</th>
                                        <th className="p-4 text-xs font-bold text-orange-700 uppercase">Fecha Vencimiento</th>
                                        <th className="p-4 text-xs font-bold text-orange-700 uppercase text-right">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alertas.map((lote) => (
                                        <tr key={lote.id} className="border-b border-gray-50 hover:bg-orange-50/50 transition-colors">
                                            <td className="p-4">
                                                <div className="font-bold text-gray-800">{lote.producto?.nombre}</div>
                                                <div className="text-[10px] text-gray-400">LOTE #{lote.id}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className="font-mono font-bold text-gray-700">{lote.cantidad}</span>
                                                <span className="text-xs text-gray-400 ml-1">unidades</span>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-medium text-gray-700">
                                                    {new Date(lote.fechaVencimiento).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-[10px] font-black uppercase animate-pulse">
                                                    Próximo a vencer
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {alertas.length === 0 && (
                                <div className="p-10 text-center text-gray-400 italic">No hay lotes en riesgo.</div>
                            )}
                        </div>
                    ) : (
                        /* TABLA DE PRODUCTOS (La de siempre) */
                        <TablaProductos productos={productosFiltrados} />
                    )}
                </section>
            </div>
        </div>
    );
};

export default InventarioPage;