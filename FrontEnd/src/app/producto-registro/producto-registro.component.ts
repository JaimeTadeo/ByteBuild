import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-producto-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
    NavbarComponent
  ],
  templateUrl: './producto-registro.component.html',
  styleUrls: ['./producto-registro.component.css']
})
export class ProductoRegistroComponent {
  productForm: FormGroup;
  private apiUrl = 'http://localhost:8080/inventario';

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      idInventario: [null, Validators.required],
      nombreEquipo: ['', [Validators.required, Validators.minLength(3)]],
      tipoEquipo: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      especificaciones: ['', Validators.required],
      cantidadDisponible: [1, [Validators.required, Validators.min(1)]],
      estado: ['nuevo', Validators.required],
      precioUnitario: [0.01, [Validators.required, Validators.min(0.01)]],
      idUsuario: [null, Validators.required],
      idAdmin: [null, Validators.required],
      imagen: ['', Validators.required] // Quité la validación de URL para permitir base64
    });
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.productForm.patchValue({ imagen: base64Image });

        // También puedes actualizar una vista previa si quieres:
        const preview = document.getElementById('previewImage') as HTMLImageElement;
        if (preview) preview.src = base64Image;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const productData = this.productForm.value;

    this.http.post(this.apiUrl, productData, { headers }).subscribe({
      next: () => {
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
