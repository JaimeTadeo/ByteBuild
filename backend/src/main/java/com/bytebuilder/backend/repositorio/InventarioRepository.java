package com.bytebuilder.backend.repositorio;

import com.bytebuilder.backend.modelo.Inventario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface InventarioRepository extends MongoRepository<Inventario, String> {
    // Métodos personalizados si es necesario
}
