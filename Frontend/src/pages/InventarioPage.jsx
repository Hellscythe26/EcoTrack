import { Link } from "react-router-dom";
import ProductoForm from "../components/ProductoForm";
import TablaProductos from "../components/TablaProductos";
import LoteForm from '../components/LoteForm';

const InventarioPage = ({
    nuevoProducto, manejarCambio, categorias, manejarCambioCategoria, guardarProducto, productos, guardarLote
}) => {
    return (
        <div className="space-y-8">
            <div className="flex item-center justify-between">
                <h2 className="text-3x1 font-bold text-gray-900">Centro de Inventario</h2>
                <Link to="/" className="text-gray-500 hover:text-gray-800">← Volver al Dashboard</Link>
            </div>
            {/*Formularios*/}
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

                {/* Columna 2: Formulario de Lotes */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 border-t-4 border-t-blue-500">
                    <div className="flex items-center gap-2 mb-6 text-blue-600">
                        <span className="text-2xl">🚚</span>
                        <h3 className="text-lg font-bold text-gray-800">Registrar Entrada (Lote)</h3>
                    </div>
                    <LoteForm
                        productos={productos}
                        guardarLote={guardarLote}
                    />
                </section>
                {/*Tabla*/}
                <section className="xl:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <TablaProductos productos={productos} />
                </section>
            </div>
        </div>
    );
};

export default InventarioPage;