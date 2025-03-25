package com.bytebuilder.backend.modelo;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "inventario") // Se conecta con la colección en MongoDB
public class Inventario {

    @Id
    private String id;

    @JsonProperty("id_inventario")
    private int id_inventario;

    @JsonProperty("nombre_equipo")
    private String nombre_equipo;

    @JsonProperty("tipo_equipo")
    private String tipo_equipo;

    @JsonProperty("marca")
    private String marca;

    @JsonProperty("modelo")
    private String modelo;

    @JsonProperty("especificaciones")
    private String especificaciones;

    @JsonProperty("cantidad_disponible")
    private int cantidad_disponible;

    @JsonProperty("estado")
    private String estado;

    @JsonProperty("precio_unitario")
    private double precio_unitario;

    @JsonProperty("id_usuario")
    private int id_usuario;

    @JsonProperty("id_admin")
    private int id_admin;

    // Getters y Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getIdInventario() {
        return id_inventario;
    }

    public void setIdInventario(int id_inventario) {
        this.id_inventario = id_inventario;
    }

    public String getNombreEquipo() {
        return nombre_equipo;
    }

    public void setNombreEquipo(String nombre_equipo) {
        this.nombre_equipo = nombre_equipo;
    }

    public String getTipoEquipo() {
        return tipo_equipo;
    }

    public void setTipoEquipo(String tipo_equipo) {
        this.tipo_equipo = tipo_equipo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getEspecificaciones() {
        return especificaciones;
    }

    public void setEspecificaciones(String especificaciones) {
        this.especificaciones = especificaciones;
    }

    public int getCantidadDisponible() {
        return cantidad_disponible;
    }

    public void setCantidadDisponible(int cantidad_disponible) {
        this.cantidad_disponible = cantidad_disponible;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public double getPrecioUnitario() {
        return precio_unitario;
    }

    public void setPrecioUnitario(double precio_unitario) {
        this.precio_unitario = precio_unitario;
    }

    public int getIdUsuario() {
        return id_usuario;
    }

    public void setIdUsuario(int id_usuario) {
        this.id_usuario = id_usuario;
    }

    public int getIdAdmin() {
        return id_admin;
    }

    public void setIdAdmin(int id_admin) {
        this.id_admin = id_admin;
    }

    // Método para mostrar los detalles del inventario (opcional)
    @Override
    public String toString() {
        return "Inventario{" +
                "id='" + id + '\'' +
                ", id_inventario=" + id_inventario +
                ", nombre_equipo='" + nombre_equipo + '\'' +
                ", tipo_equipo='" + tipo_equipo + '\'' +
                ", marca='" + marca + '\'' +
                ", modelo='" + modelo + '\'' +
                ", especificaciones='" + especificaciones + '\'' +
                ", cantidad_disponible=" + cantidad_disponible +
                ", estado='" + estado + '\'' +
                ", precio_unitario=" + precio_unitario +
                ", id_usuario=" + id_usuario +
                ", id_admin=" + id_admin +
                '}';
    }
}