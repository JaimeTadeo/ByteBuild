import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Asegúrate de importar RouterOutlet
import { InicioComponent } from './inicio/inicio.component'; // Asegúrate de importar InicioComponent
import {CardFancyComponent} from './card-fancy/card-fancy.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [InicioComponent, CardFancyComponent]  
})
export class AppComponent {
  title = 'TuProyecto';
}
