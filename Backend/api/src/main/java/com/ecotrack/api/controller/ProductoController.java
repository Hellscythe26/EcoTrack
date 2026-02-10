package com.ecotrack.api.controller;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ecotrack.api.dto.ProductoDTO;
import com.ecotrack.api.entity.Producto;
import com.ecotrack.api.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    private ProductoDTO convertirADto(Producto producto) {
        int stock = productoService.calcularStockReal(producto.getId());
        return new ProductoDTO(
            producto.getId(),
            producto.getNombre(),
            producto.getCategoria(),
            stock,
            producto.getActivo()
        );
    }

    @PostMapping
    public ResponseEntity<ProductoDTO> crear(@RequestBody Producto producto) {
        Producto nuevoProducto = productoService.guardar(producto);
        return ResponseEntity.ok(convertirADto(nuevoProducto));
    }

    @GetMapping
    public List<ProductoDTO> obtenerTodos() {
        return productoService.listarTodos().stream().map(this::convertirADto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerPorId(@PathVariable Long id) {
        Producto producto = productoService.buscarPorId(id);
        return producto != null ? ResponseEntity.ok(convertirADto(producto)) : ResponseEntity.notFound().build();
    }

    @GetMapping("/buscar")
    public List<ProductoDTO> obtenerPorNombre(@RequestParam String nombre) {
        return productoService.buscarPorNombre(nombre).stream().map(this::convertirADto).collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.eliminarLogico(id); 
        return ResponseEntity.noContent().build();
    }
}