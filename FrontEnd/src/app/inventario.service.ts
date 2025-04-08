import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Inventario {
  idInventario: number;
  nombreEquipo: string;
  cantidadDisponible: number;
  precioUnitario: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})

export class InventarioService {
  private apiUrl = 'http://localhost:8080/inventario'; // Base URL para la API

  constructor(private http: HttpClient) {}

  // Obtener todos los productos del inventario
  getInventario(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.apiUrl);
  }

  // Eliminar un producto del inventario
  deleteInventario(id: number): Observable<void> {
    const deleteUrl = `http://localhost:8080/inventario/eliminar/${id}`; // Ajuste en la URL para eliminar
    return this.http.delete<void>(deleteUrl);
  }

  // Modificar un producto
  updateInventario(id: number, inventario: Inventario): Observable<Inventario> {
    const updateUrl = `http://localhost:8080/inventario/actualizar/${id}`; // Ajuste en la URL para actualizar
    return this.http.put<Inventario>(updateUrl, inventario);
  }
}
