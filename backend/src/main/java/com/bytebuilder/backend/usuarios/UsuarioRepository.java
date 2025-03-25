package com.bytebuilder.backend.usuarios;

import com.bytebuilder.backend.usuarios.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByIdUsuario(int idUsuario);
    void deleteByIdUsuario(int idUsuario);
}
