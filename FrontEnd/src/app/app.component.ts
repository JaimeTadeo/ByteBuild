import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'; // Añadir RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './app.component.html', // 👈 Usar el archivo externo
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ByteBuild';
}