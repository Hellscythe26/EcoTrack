package com.ecotrack.api.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ecotrack.api.entity.Lote;
import com.ecotrack.api.entity.Producto;
import com.ecotrack.api.repository.LoteRepository;
import com.ecotrack.api.repository.ProductoRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private LoteRepository loteRepository;

    public Producto guardar(Producto producto) {
        if (productoRepository.existsByNombreIgnoreCaseAndActivoTrue(producto.getNombre())) {
            throw new RuntimeException("Ya existe un producto activo con el nombre: " + producto.getNombre());
        }
        return productoRepository.save(producto);
    }

    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    public Producto buscarPorId(Long id) {
        return productoRepository.findById(id).orElse(null);
    }

    public List<Producto> buscarPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    @Transactional
    public void eliminarLogico(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        producto.setActivo(false);
        productoRepository.save(producto);
        List<Lote> lotes = loteRepository.findByProductoIdAndActivoTrue(id);
        lotes.forEach(lote -> {
            lote.setActivo(false);
        });
        loteRepository.saveAll(lotes);
    }

    public int calcularStockReal(Long productoId) {
        Integer stock = loteRepository.sumarStockPorProducto(productoId);
        return (stock != null) ? stock : 0;
    }
}