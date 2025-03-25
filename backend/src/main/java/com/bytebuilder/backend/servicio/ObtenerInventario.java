package com.bytebuilder.backend.servicio;

import com.bytebuilder.backend.modelo.Inventario;
import com.bytebuilder.backend.repositorio.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObtenerInventario {

    @Autowired
    private InventarioRepository tuEntidadRepository;

    public List<Inventario> obtenerTodos() {
        return tuEntidadRepository.findAll(); // Obtener todos los documentos de la colección
    }
}
