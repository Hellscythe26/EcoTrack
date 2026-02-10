package com.ecotrack.api.dto;

import com.ecotrack.api.entity.Categoria;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductoDTO {
    
    private Long id;
    private String nombre;
    private Categoria categoria;
    private int stockTotal;
    private Boolean activo;
}