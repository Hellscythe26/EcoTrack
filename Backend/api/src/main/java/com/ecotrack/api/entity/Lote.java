package com.ecotrack.api.entity;

import java.time.LocalDateTime;
import org.hibernate.annotations.SQLRestriction;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lote")
@AllArgsConstructor
@NoArgsConstructor
@Data
@SQLRestriction("activo = true")
public class Lote {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Producto producto;

    @Column(nullable = false)
    private LocalDateTime fechaVencimiento;

    @Column(nullable = false)
    private int cantidad;

    @Column(nullable = false)
    private Boolean estado;

    @Column(nullable = false)
    private Boolean activo;
}