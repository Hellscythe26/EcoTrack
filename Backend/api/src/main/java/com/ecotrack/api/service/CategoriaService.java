package com.ecotrack.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecotrack.api.entity.Categoria;
import com.ecotrack.api.repository.CategoriaRepository;

@Service
public class CategoriaService {
 
    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria guardar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> listarTodos() {
        return categoriaRepository.findAll();
    }

    public Categoria buscarPorId(Long id) {
        return categoriaRepository.findById(id).orElse(null);
    }
}