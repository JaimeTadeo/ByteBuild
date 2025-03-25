import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Componente {
  id: number;
  nombre: string;
  tipo: string;
  precio: number;
  especificaciones: { [key: string]: string };
  imagen?: string;
}

@Component({
  selector: 'app-comparacion',
  standalone: true,
  templateUrl: './comparacion.component.html',
  styleUrls: ['./comparacion.component.css'],
  imports: [
    ReactiveFormsModule, // <-- Añadir esto
    CommonModule         // <-- Añadir esto
  ]
})
export class ComparacionComponent {
  searchControl = new FormControl();
  resultadosBusqueda: Componente[] = [];
  componentesSeleccionados: Componente[] = [];
  Object = Object;
  
  // Datos de ejemplo (deberías obtenerlos de un servicio)
  componentes: Componente[] = [
    {
      id: 1,
      nombre: 'Ryzen 5 5600X',
      tipo: 'CPU',
      precio: 1200,
      especificaciones: {
        Núcleos: '6',
        Hilos: '12',
        Frecuencia: '3.7GHz',
        TDP: '65W'
      },
      imagen: '/assets/cpu-amd.jpg'
    },
    // ... más componentes
  ];

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(query => this.buscarComponentes(query));
  }

  buscarComponentes(query: string) {
    this.resultadosBusqueda = this.componentes.filter(componente =>
      componente.nombre.toLowerCase().includes(query.toLowerCase())
    );
  }

  agregarAComparacion(componente: Componente) {
    if (this.componentesSeleccionados.length < 4) { // Límite de comparación
      this.componentesSeleccionados.push(componente);
    }
  }

  eliminarDeComparacion(index: number) {
    this.componentesSeleccionados.splice(index, 1);
  }

  getSafeImage(imagePath: string | undefined): string {
    return imagePath || 'assets/default-component.png';
  }
  
  getSafeAlt(name: string | undefined): string {
    return name ? `Imagen de ${name}` : 'Imagen de componente genérico';
  }
  
}

