import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'; // Añadir RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule // Necesario para routerLink
  ],
  template: `
    <!-- Botones de navegación -->
    <nav>
      <button [routerLink]="['/']">Inicio</button>
      <button [routerLink]="['/comparacion']">Comparación</button>
      <button [routerLink]="['/tracking']">Tracking</button>
      <button [routerLink]="['/registro']">Registro</button>
      <button [routerLink]="['/login']">Login</button>
      <button [routerLink]="['/producto-registro']">Producto Registro</button>
      <button [routerLink]="['/inventario']">Inventario</button>
    </nav>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ByteBuild';
}