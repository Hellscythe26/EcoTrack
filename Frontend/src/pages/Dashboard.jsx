import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ totalProductos, totalCategorias, proximosAVencer, productosBajoStock, mostrarStock, alertas }) => {
    const navigate = useNavigate();
    return (
        <>
            {/*BANNER PRINCIPAL*/}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Gestión de inventario</h1>
                    <p className="text-lg text-gray-500 mt-1">Panel de control principal</p>
                </div>
                <Link to="/inventario" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-colors">
                    Ir al Inventario
                </Link>
            </div>
            {/*GRID DE ESTADISTICAS*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600 text-2xl">📦</div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Productos</p>
                        <h4 className="text-2xl font-bold text-gray-900">{totalProductos}</h4>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg text-purple-600 text-2xl">🏷️</div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Categorías</p>
                        <h4 className="text-2xl font-bold text-gray-900">{totalCategorias}</h4>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg text-orange-600 text-2xl">⚠️</div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Por Vencer</p>
                        <h4 className="text-2xl font-bold text-gray-900">{alertas.length}</h4>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-lg text-red-600 text-2xl">📉</div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Stock Bajo</p>
                        <h4 className="text-2xl font-bold text-gray-900">{productosBajoStock}</h4>
                    </div>
                </div>
            </div>
            {/*SECCIÓN DE ACCIONES Y ALERTAS*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Tarjeta de Acciones Rápidas */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        ⚡ Acciones Rápidas
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link to="/inventario" className="flex flex-col items-center justify-center p-4 rounded-xl border border-blue-100 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all group">
                            <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">📋</span>
                            <span className="text-sm font-semibold">Ver Inventario</span>
                        </Link>
                        <Link to={"/inventario?filtro=bajo"} className="flex flex-col items-center justify-center p-4 rounded-xl border border-red-100 bg-red-50 text-red-700 hover:bg-red-100 transition-all group">
                            <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">📉</span>
                            <span className="text-sm font-semibold">Stock Bajo</span>
                        </Link>
                        <Link to="/inventario?filtro=vencimiento" className="flex flex-col items-center justify-center p-4 rounded-xl border border-orange-100 bg-orange-50 text-orange-700 hover:bg-orange-100 transition-all group">
                            <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">⏰</span>
                            <span className="text-sm font-semibold">Vencimientos</span>
                        </Link>
                    </div>
                </div>
                {/* Tarjeta Dinámica */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center min-h-[250px] relative overflow-hidden">
                    {mostrarStock ? (
                        <div key="stock" className="animate-in fade-in slide-in-from-right-4 duration-700 text-center p-4 rounded-xl hover:bg-red-50 transition-colors">
                            <span className="text-4xl mb-4 block">🚨</span>
                            <h4 className="text-lg font-bold text-gray-800">Alerta de Stock Bajo</h4>
                            <p className="text-gray-500 text-sm mb-4 italic">
                                {productosBajoStock} {productosBajoStock === 1 ? 'producto está' : 'productos están'} por agotarse
                            </p>
                            {/* Este link añade ?filtro=bajo a la URL */}
                            <Link
                                to="/inventario?filtro=bajo"
                                className="text-red-600 font-bold text-sm hover:underline p-2"
                            >
                                Revisar ahora →
                            </Link>
                        </div>
                    ) : (
                        <div key="vence" className="animate-in fade-in slide-in-from-right-4 duration-700 text-center">
                            <span className="text-4xl mb-4 block">⏰</span>
                            <h4 className="text-lg font-bold text-gray-800">Próximos Vencimientos</h4>

                            {alertas.length > 0 ? (
                                <>
                                    <p className="text-orange-600 text-xl font-black mb-1">
                                        {alertas.length} {alertas.length === 1 ? 'Lote' : 'Lotes'}
                                    </p>
                                    <p className="text-gray-500 text-sm mb-4 italic">
                                        Vencen en los próximos 7 días
                                    </p>
                                </>
                            ) : (
                                <p className="text-gray-500 text-sm mb-4 italic">
                                    Todo al día. No hay vencimientos próximos.
                                </p>
                            )}

                            {/* Cambiamos el onClick por un Link hacia el inventario filtrado */}
                            <Link
                                to="/inventario?filtro=vencimiento"
                                className="text-orange-600 font-bold text-sm hover:underline"
                            >
                                Ver detalles →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;