package com.ecotrack.api.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.ecotrack.api.entity.Lote;
import com.ecotrack.api.repository.LoteRepository;

@Service
public class LoteService {
 
    @Autowired
    private LoteRepository loteRepository;

    public Lote guardar(Lote lote) {
        LocalDateTime ahora = LocalDateTime.now();
        if(!lote.getFechaVencimiento().isAfter(ahora)) {
            throw new IllegalArgumentException("La fecha de vencimiento no puede ser igual o menor a la fecha actual");
        }
        return loteRepository.save(lote);
    }

    public List<Lote> obtenerAlertasVencidas(int dias) {
        LocalDateTime hoy = LocalDateTime.now();
        LocalDateTime fechaLimite = hoy.plusDays(dias);
        return loteRepository.buscarVencimientosProximos(hoy, fechaLimite);
    }

    public List<Lote> listarTodos() {
        return loteRepository.findAll();
    }

    public Lote buscarPorId(Long id) {
        return loteRepository.findById(id).orElse(null);
    }

    public List<Lote> buscarPorProducto(Long productoId) {
        return loteRepository.findByProductoIdAndActivoTrue(productoId);
    }

    public void eliminar(Long id) {
        loteRepository.deleteById(id);
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void revisarVencimientoAutomaticamente() {
        System.out.println("Ejecutando revisión automática de vencimientos...");
        loteRepository.desactivarLotesVencidos(LocalDateTime.now());
    }
}