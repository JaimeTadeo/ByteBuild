import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-producto-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './producto-registro.component.html',
  styleUrls: ['./producto-registro.component.css']
})
export class ProductoRegistroComponent {
  productForm: FormGroup;
  private apiUrl = 'http://localhost:8080/inventario';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      idInventario: [null, Validators.required],
      nombreEquipo: ['', [Validators.required, Validators.minLength(3)]],
      tipoEquipo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      especificaciones: ['', [Validators.required]],
      cantidadDisponible: [1, [Validators.required, Validators.min(1)]],
      estado: ['nuevo', Validators.required],
      precioUnitario: [0.01, [Validators.required, Validators.min(0.01)]],
      idUsuario: [null, [Validators.required]],
      idAdmin: [null, [Validators.required]],
      imagen: ['', [Validators.required, Validators.pattern('(https?://.*\.(?:png|jpg|jpeg|gif|svg))')]]
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const productData = this.productForm.value;

    this.http.post(this.apiUrl, productData, { headers }).subscribe({
      next: (response) => {
        alert('Producto registrado con éxito');
        this.router.navigate(['/productos']);
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Error al registrar el producto');
      }
    });
  }
}