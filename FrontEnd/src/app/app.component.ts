import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Asegúrate de importar RouterOutlet
import { InicioComponent } from './inicio/inicio.component'; // Asegúrate de importar InicioComponent

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, InicioComponent]  // Asegúrate de importar RouterOutlet y InicioComponent
})
export class AppComponent {
  title = 'TuProyecto';
}
