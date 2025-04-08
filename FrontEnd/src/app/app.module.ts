import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';  // Importar el componente standalone
import { AppRoutingModule } from './app.routes';  // Asegúrate de que las rutas estén bien configuradas
import { MatTableModule } from '@angular/material/table';

import { InicioComponent } from './inicio/inicio.component';
import { ComparacionComponent } from './comparacion/comparacion.component';
import { TrackingComponent } from './tracking/tracking.component'; 
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ProductoRegistroComponent } from './producto-registro/producto-registro.component';
import { InventarioComponent } from './inventario/inventario.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,  // Asegúrate de importar el módulo de rutas
    CommonModule,
    FormsModule,
    MatTableModule,
    AppComponent,
    InicioComponent,
    ComparacionComponent,
    TrackingComponent,
    RegistroComponent,
    LoginComponent,
    ProductoRegistroComponent,
    InventarioComponent
  ],
  providers: [],
})
export class AppModule { }