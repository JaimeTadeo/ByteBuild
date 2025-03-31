import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ComparacionComponent } from './comparacion/comparacion.component';
import { TrackingComponent } from './tracking/tracking.component'; // Añade esta línea

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'comparacion', component: ComparacionComponent },
  { path: 'tracking', component: TrackingComponent }
];