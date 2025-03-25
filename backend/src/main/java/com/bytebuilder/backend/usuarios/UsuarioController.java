package com.bytebuilder.backend.usuarios;

import com.bytebuilder.backend.usuarios.Usuario;
import com.bytebuilder.backend.usuarios.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);
    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        logger.info("Obteniendo todos los usuarios");
        return usuarioRepository.findAll();
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable int idUsuario) {
        logger.info("Buscando usuario con idUsuario: {}", idUsuario);
        return usuarioRepository.findByIdUsuario(idUsuario)
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    logger.warn("Usuario con idUsuario {} no encontrado", idUsuario);
                    return ResponseEntity.notFound().build();
                });
    }

    @PostMapping
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
        logger.info("Creando nuevo usuario: {}", usuario.getNombre());
        return new ResponseEntity<>(usuarioRepository.save(usuario), HttpStatus.CREATED);
    }

    @PutMapping("/{idUsuario}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable int idUsuario, @RequestBody Usuario usuarioDetails) {
        logger.info("Intentando actualizar usuario con idUsuario: {}", idUsuario);
        return usuarioRepository.findByIdUsuario(idUsuario).map(usuario -> {
            usuario.setNombre(usuarioDetails.getNombre());
            usuario.setApellido(usuarioDetails.getApellido());
            usuario.setCorreo(usuarioDetails.getCorreo());
            usuario.setPassword(usuarioDetails.getPassword());
            usuario.setRol(usuarioDetails.getRol());
            Usuario updatedUsuario = usuarioRepository.save(usuario);
            logger.info("Usuario con idUsuario {} actualizado correctamente", idUsuario);
            return ResponseEntity.ok(updatedUsuario);
        }).orElseGet(() -> {
            logger.warn("Usuario con idUsuario {} no encontrado", idUsuario);
            return ResponseEntity.notFound().build();
        });
    }

    @DeleteMapping("/eliminar/{idUsuario}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable int idUsuario) {
        logger.info("Intentando eliminar usuario con idUsuario: {}", idUsuario);
        Optional<Usuario> usuario = usuarioRepository.findByIdUsuario(idUsuario);

        if (usuario.isPresent()) {
            try {
                usuarioRepository.deleteByIdUsuario(idUsuario);
                logger.info("Usuario con idUsuario {} eliminado correctamente", idUsuario);
                return ResponseEntity.noContent().build(); // 204 No Content
            } catch (Exception e) {
                logger.error("Error al eliminar usuario con idUsuario {}: {}", idUsuario, e.getMessage(), e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Error interno
            }
        } else {
            logger.warn("Usuario con idUsuario {} no encontrado", idUsuario);
            return ResponseEntity.notFound().build(); // 404 No encontrado
        }
    }
}