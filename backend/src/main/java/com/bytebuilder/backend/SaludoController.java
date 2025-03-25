package com.bytebuilder.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class SaludoController {

    @PostMapping("/api/saludar")
    public ResponseEntity<String> saludar(@RequestBody Map<String, String> request) {
        String nombre = request.get("nombre");  // Acceder al nombre desde el cuerpo de la solicitud
        return ResponseEntity.ok("¡Hola, " + nombre + "!");
    }

}
