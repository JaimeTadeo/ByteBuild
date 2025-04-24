package com.bytebuilder.backend.Inventario.repositorio;

import com.bytebuilder.backend.Inventario.modelo.Inventario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.bson.types.ObjectId;
import java.util.Optional;

@Repository
public interface InventarioRepository extends MongoRepository<Inventario, ObjectId>
{
    Optional<Inventario> findByIdInventario(int idInventario); // Nuevo metodo de búsqueda por idInventario
    void deleteByIdInventario(int idInventario); // Eliminar por idInventario
}

