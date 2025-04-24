package com.bytebuilder.backend.inventario.controller;

import com.bytebuilder.backend.Inventario.controller.InventarioController;
import com.bytebuilder.backend.Inventario.modelo.Inventario;
import com.bytebuilder.backend.Inventario.repositorio.InventarioRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;  // Importar verify
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


public class InventarioControllerTest {

    private MockMvc mockMvc;

    @Mock
    private InventarioRepository inventarioRepository;

    @InjectMocks
    private InventarioController inventarioController;

    private Inventario inventario;

    @BeforeEach
    void setUp() {
        // Inicializar los mocks
        MockitoAnnotations.openMocks(this);

        // Crear el objeto Inventario de prueba
        inventario = new Inventario();
        inventario.setIdInventario(456);
        inventario.setNombreEquipo("Equipo de prueba");
        // Aquí puedes inicializar el resto de propiedades de inventario
        mockMvc = MockMvcBuilders.standaloneSetup(inventarioController).build();
    }

    @Test
    void testObtenerPorIdInventarioFound() throws Exception {
        // Configuración del mock para que devuelva un inventario cuando se busque por idInventario
        when(inventarioRepository.findByIdInventario(456)).thenReturn(Optional.of(inventario));

        mockMvc.perform(get("/inventario/buscar/idInventario/456"))
                .andExpect(status().isOk()) // Esperamos que devuelva un 200 OK
                .andExpect(jsonPath("$.nombreEquipo").value("Equipo de prueba"));
    }

    @Test
    void testObtenerPorIdInventarioNotFound() throws Exception {
        // Configuración del mock para que devuelva un Optional vacío si no se encuentra el inventario
        when(inventarioRepository.findByIdInventario(456)).thenReturn(Optional.empty());

        mockMvc.perform(get("/inventario/buscar/idInventario/456"))
                .andExpect(status().isNotFound()); // Esperamos un 404 Not Found
    }

    @Test
    void testEliminarEquipoExistente() throws Exception {
        // Configuración del mock para que devuelva un inventario cuando se busque por idInventario
        when(inventarioRepository.findByIdInventario(456)).thenReturn(Optional.of(inventario));

        // Realizamos la solicitud de eliminación y verificamos la respuesta
        mockMvc.perform(delete("/inventario/eliminar/456"))
                .andExpect(status().isNoContent()); // Esperamos un 204 No Content (Eliminado correctamente)

        // Verificamos que el repositorio haya llamado al método deleteByIdInventario
        verify(inventarioRepository).deleteByIdInventario(456);  // Aquí usamos verify
    }

    @Test
    void testEliminarEquipoNoExistente() throws Exception {
        // Configuración del mock para que devuelva un Optional vacío si no se encuentra el inventario
        when(inventarioRepository.findByIdInventario(456)).thenReturn(Optional.empty());

        // Realizamos la solicitud de eliminación y verificamos la respuesta
        mockMvc.perform(delete("/inventario/eliminar/456"))
                .andExpect(status().isNotFound()); // Esperamos un 404 Not Found (No encontrado)
    }

}
