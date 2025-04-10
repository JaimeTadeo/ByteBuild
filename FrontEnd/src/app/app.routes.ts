import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ComparacionComponent } from './comparacion/comparacion.component';
import { TrackingComponent } from './tracking/tracking.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ProductoRegistroComponent } from './producto-registro/producto-registro.component';
import { InventarioComponent } from './inventario/inventario.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'comparacion', component: ComparacionComponent },
  { path: 'tracking', component: TrackingComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'producto-registro', component: ProductoRegistroComponent },
  { path: 'inventario', component: InventarioComponent }
];