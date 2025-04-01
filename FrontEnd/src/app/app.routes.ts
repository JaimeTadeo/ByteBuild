import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ComparacionComponent } from './comparacion/comparacion.component';
import { TrackingComponent } from './tracking/tracking.component'; 
import { Registro } from './registro/registro.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'comparacion', component: ComparacionComponent },
  { path: 'tracking', component: TrackingComponent },
  { path: 'registro', component: Registro }
];