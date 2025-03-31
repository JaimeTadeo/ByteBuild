package com.bytebuilder.backend.modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
import com.bytebuilder.backend.utils.ObjectIdSerializer;
import com.bytebuilder.backend.utils.ObjectIdDeserializer;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "inventario")  // Asegúrate de que el nombre de la colección esté correcto
public class Inventario {

    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)  // Serializa ObjectId como String
    @JsonDeserialize(using = ObjectIdDeserializer.class)  // Deserializa String a ObjectId
    private ObjectId _id;  // MongoDB ObjectId

    @JsonIgnore
    private String id; //evita mostrar un timestamp

    private int idInventario;

    @Field("nombreEquipo") // Mapea el campo de MongoDB correctamente
    private String nombreEquipo;

    @Field("tipoEquipo")
    private String tipoEquipo;

    private String marca;
    private String modelo;
    private String especificaciones;
    private int cantidadDisponible;
    private String estado;
    private double precioUnitario;
    private int idUsuario;
    private int idAdmin;

    // Getters y setters
    public ObjectId getId() {
        return _id;
    }

    public void setId(ObjectId _id) {
        this._id = _id;
    }

    public int getIdInventario() {
        return idInventario;
    }

    public void setIdInventario(int idInventario) {
        this.idInventario = idInventario;
    }

    public String getNombreEquipo() {
        return nombreEquipo;
    }

    public void setNombreEquipo(String nombreEquipo) {
        this.nombreEquipo = nombreEquipo;
    }

    public String getTipoEquipo() {
        return tipoEquipo;
    }

    public void setTipoEquipo(String tipoEquipo) {
        this.tipoEquipo = tipoEquipo;
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
        return cantidadDisponible;
    }

    public void setCantidadDisponible(int cantidadDisponible) {
        this.cantidadDisponible = cantidadDisponible;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public int getIdAdmin() {
        return idAdmin;
    }

    public void setIdAdmin(int idAdmin) {
        this.idAdmin = idAdmin;
    }

    // Método para mostrar los detalles del inventario (opcional)
    @Override
    public String toString() {
        return "Inventario{" +
                "_id='" + (_id != null ? _id.toHexString() : "null") + '\'' +  // Convierte un ObjectId a String
                ", idInventario=" + idInventario +
                ", nombreEquipo='" + nombreEquipo + '\'' +
                ", tipoEquipo='" + tipoEquipo + '\'' +
                ", marca='" + marca + '\'' +
                ", modelo='" + modelo + '\'' +
                ", especificaciones='" + especificaciones + '\'' +
                ", cantidadDisponible=" + cantidadDisponible +
                ", estado='" + estado + '\'' +
                ", precioUnitario=" + precioUnitario +
                ", idUsuario=" + idUsuario +
                ", idAdmin=" + idAdmin +
                '}';
    }
}