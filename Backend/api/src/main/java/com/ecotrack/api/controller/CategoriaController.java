package com.ecotrack.api.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ecotrack.api.entity.Categoria;
import com.ecotrack.api.service.CategoriaService;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {
 
    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<Categoria> crear(@RequestBody Categoria categoria) {
        categoria.setNombre(categoria.getNombre().toUpperCase());
        Categoria nuevaCategoria = categoriaService.guardar(categoria);
        return ResponseEntity.ok(nuevaCategoria);
    }

    @GetMapping
    public List<Categoria> obtenerTodos() {
        return categoriaService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerPorId(@PathVariable Long id) {
        Categoria categoria = categoriaService.buscarPorId(id);
        return categoria != null ? ResponseEntity.ok(categoria): ResponseEntity.notFound().build();
    }
}