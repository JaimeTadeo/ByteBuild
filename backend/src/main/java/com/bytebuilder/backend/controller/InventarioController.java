package com.bytebuilder.backend.controller;

import com.bytebuilder.backend.modelo.Inventario;
import com.bytebuilder.backend.repositorio.InventarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inventario")
public class InventarioController {

    private static final Logger logger = LoggerFactory.getLogger(InventarioController.class);

    @Autowired
    private InventarioRepository inventarioRepository;

    // Obtener todo el inventario
    @GetMapping
    public List<Inventario> getAllInventario() {
        logger.info("Obteniendo todo el inventario");
        return inventarioRepository.findAll();
    }

    // Obtener un inventario por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Inventario> getInventarioById(@PathVariable String id) {
        logger.info("Buscando inventario con ID: {}", id);
        Optional<Inventario> inventario = inventarioRepository.findById(id);
        if (inventario.isPresent()) {
            return new ResponseEntity<>(inventario.get(), HttpStatus.OK);
        } else {
            logger.warn("Inventario con ID {} no encontrado", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Guardar un nuevo equipo
    @PostMapping
    public ResponseEntity<Inventario> addEquipo(@RequestBody Inventario inventario) {
        if (inventario.getNombreEquipo() == null || inventario.getNombreEquipo().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Inventario savedInventario = inventarioRepository.save(inventario);
        return new ResponseEntity<>(savedInventario, HttpStatus.CREATED);
    }


    // Eliminar un equipo por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipo(@PathVariable String id) {
        logger.info("Intentando eliminar equipo con ID: {}", id);
        Optional<Inventario> inventario = inventarioRepository.findById(id);
        if (inventario.isPresent()) {
            try {
                inventarioRepository.deleteById(id);
                logger.info("Equipo con ID {} eliminado correctamente", id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                logger.error("Error al eliminar equipo con ID {}: {}", id, e.getMessage(), e);
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            logger.warn("Equipo con ID {} no encontrado", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Actualizar un equipo por ID
    @PutMapping("/{id}")
    public ResponseEntity<Inventario> updateEquipo(@PathVariable String id, @RequestBody Inventario inventarioDetails) {
        logger.info("Intentando actualizar equipo con ID: {}", id);
        Optional<Inventario> optionalInventario = inventarioRepository.findById(id);
        if (optionalInventario.isPresent()) {
            try {
                Inventario existingInventario = optionalInventario.get();
                existingInventario.setNombreEquipo(inventarioDetails.getNombreEquipo());
                existingInventario.setTipoEquipo(inventarioDetails.getTipoEquipo());
                existingInventario.setMarca(inventarioDetails.getMarca());
                existingInventario.setModelo(inventarioDetails.getModelo());
                existingInventario.setEspecificaciones(inventarioDetails.getEspecificaciones());
                existingInventario.setCantidadDisponible(inventarioDetails.getCantidadDisponible());
                existingInventario.setEstado(inventarioDetails.getEstado());
                existingInventario.setPrecioUnitario(inventarioDetails.getPrecioUnitario());
                existingInventario.setIdUsuario(inventarioDetails.getIdUsuario());
                existingInventario.setIdAdmin(inventarioDetails.getIdAdmin());

                Inventario updatedInventario = inventarioRepository.save(existingInventario);
                logger.info("Equipo con ID {} actualizado correctamente", id);
                return new ResponseEntity<>(updatedInventario, HttpStatus.OK);
            } catch (Exception e) {
                logger.error("Error al actualizar equipo con ID {}: {}", id, e.getMessage(), e);
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            logger.warn("Equipo con ID {} no encontrado", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
