package com.ecotrack.api.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.ecotrack.api.entity.Lote;

@Repository
public interface LoteRepository extends JpaRepository<Lote, Long> {
    List<Lote> findByProductoIdAndActivoTrue(Long productoId);

    @Query("SELECT SUM(l.cantidad) FROM Lote l WHERE l.producto.id = :productoId AND l.estado = true")
    Integer sumarStockPorProducto(@Param("productoId") Long productoId); 

    @Query("SELECT l FROM Lote l WHERE l.fechaVencimiento BETWEEN :inicio AND :fin AND l.estado = true")
    List<Lote> buscarVencimientosProximos(@Param("inicio") LocalDateTime inicio, @Param("fin") LocalDateTime fin);

    @Modifying
    @Transactional
    @Query("UPDATE Lote l SET l.estado = false WHERE l.fechaVencimiento < :ahora AND l.estado = true")
    void desactivarLotesVencidos(@Param("ahora") LocalDateTime ahora);
}