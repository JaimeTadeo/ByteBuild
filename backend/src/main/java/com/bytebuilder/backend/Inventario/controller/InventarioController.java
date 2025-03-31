package com.bytebuilder.backend.Inventario.controller;

import com.bytebuilder.backend.Inventario.modelo.Inventario;
import com.bytebuilder.backend.Inventario.repositorio.InventarioRepository;
import org.bson.types.ObjectId;
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

    // Obtenertodo el inventario
    @GetMapping
    public List<Inventario> getAllInventario() {
        logger.info("Obteniendo todo el inventario");
        List<Inventario> inventarios = inventarioRepository.findAll();
        if (inventarios.isEmpty()) {
            logger.warn("No se encontraron inventarios.");
        }
        return inventarios;
    }

    // Buscar por _id (ObjectId)
    @GetMapping("/buscar/{id}")
    public ResponseEntity<Inventario> obtenerPorId(@PathVariable String id) {
        try {
            logger.info("Obteniendo por el object ID");
            ObjectId objectId = new ObjectId(id);
            Optional<Inventario> inventario = inventarioRepository.findById(objectId);
            return inventario.map(ResponseEntity::ok)
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            logger.warn("ID inválido: {}", id);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //Buscar por el IDINVENTARIO
    @GetMapping("/buscar/idInventario/{idInventario}")
    public ResponseEntity<Inventario> obtenerPorIdInventario(@PathVariable int idInventario) {

        logger.info("Obteniendo el IDinventario");
        Optional<Inventario> inventario = inventarioRepository.findByIdInventario(idInventario);

        return inventario.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Guardar un nuevo equipo
    @PostMapping
    public ResponseEntity<?> addEquipo(@RequestBody Inventario inventario) {
        if (inventario.getNombreEquipo() == null || inventario.getNombreEquipo().isEmpty()) {
            logger.error("El nombre del equipo no puede estar vacío.");
            return ResponseEntity.badRequest().body("El nombre del equipo no puede estar vacío.");
        }
        if (inventario.getCantidadDisponible() < 0) {
            logger.error("La cantidad disponible no puede ser negativa.");
            return ResponseEntity.badRequest().body("La cantidad disponible no puede ser negativa.");
        }
        // Verificar si ya existe un equipo con el mismo idInventario
        Optional<Inventario> existente = inventarioRepository.findByIdInventario(inventario.getIdInventario());
        if (existente.isPresent()) {
            logger.error("Ya existe un equipo con idInventario: {}", inventario.getIdInventario());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El idInventario ya existe.");
        }

        try {
            Inventario savedInventario = inventarioRepository.save(inventario);
            logger.info("Nuevo inventario creado con ID: {}", savedInventario.getId());
            return new ResponseEntity<>(savedInventario, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error al crear inventario: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno al registrar el equipo.");
        }
    }


    // Eliminar un equipo por idInventario
    @DeleteMapping("/eliminar/{idInventario}")
    public ResponseEntity<Void> deleteEquipo(@PathVariable int idInventario)
    {
        logger.info("Intentando eliminar equipo con idInventario: {}", idInventario);

        Optional<Inventario> inventario = inventarioRepository.findByIdInventario(idInventario);

        if (inventario.isPresent()) {
            try {
                inventarioRepository.deleteByIdInventario(idInventario);
                logger.info("Equipo con idInventario {} eliminado correctamente", idInventario);
                return ResponseEntity.noContent().build(); // 204 No Content (Eliminado exitosamente)
            } catch (Exception e) {
                logger.error("Error al eliminar equipo con idInventario {}: {}", idInventario, e.getMessage(), e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Error interno
            }
        } else {
            logger.warn("Equipo con idInventario {} no encontrado", idInventario);
            return ResponseEntity.notFound().build(); // 404 No encontrado
        }
    }

    // Actualizar un equipo por idInventario
    @PutMapping("/actualizar/{idInventario}")
    public ResponseEntity<Inventario> updateEquipo(@PathVariable int idInventario, @RequestBody Inventario inventarioDetails) {
        logger.info("Intentando actualizar equipo con idInventario: {}", idInventario);

        Optional<Inventario> optionalInventario = inventarioRepository.findByIdInventario(idInventario);

        if (optionalInventario.isPresent()) {
            try {
                Inventario updatedInventario = updateExistingInventario(optionalInventario.get(), inventarioDetails);
                inventarioRepository.save(updatedInventario);
                logger.info("Equipo con idInventario {} actualizado correctamente", idInventario);
                return ResponseEntity.ok(updatedInventario);
            } catch (Exception e) {
                logger.error("Error al actualizar equipo con idInventario {}: {}", idInventario, e.getMessage(), e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            logger.warn("Equipo con idInventario {} no encontrado", idInventario);
            return ResponseEntity.notFound().build();
        }
    }

    // Método privado para actualizar el inventario
    private Inventario updateExistingInventario(Inventario existingInventario, Inventario inventarioDetails) {
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

        return existingInventario;
    }

}
