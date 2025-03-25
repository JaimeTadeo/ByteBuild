package com.bytebuilder.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Aplica CORS a los endpoints bajo /api/**
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:1234")  // El origen del frontend
                .allowedMethods("POST", "GET", "PUT", "DELETE")  // Métodos HTTP permitidos
                .allowedHeaders("*")  // Permite cualquier cabecera
                .allowCredentials(true);  // Permitir credenciales (cookies, autenticación)
    }
}
