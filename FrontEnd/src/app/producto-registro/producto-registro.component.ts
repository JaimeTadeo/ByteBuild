import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
//import { AuthService } from '../../services/auth.service'; // Servicio de autenticación

@Component({
  selector: 'app-producto-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './producto-registro.component.html',
  styleUrls: ['./producto-registro.component.css']
})
export class ProductoRegistroComponent {
  productForm: FormGroup;
  estados = ['nuevo', 'usado', 'reacondicionado'];
  tiposEquipo = [
    'GPU', 'CPU', 'RAM', 'Almacenamiento', 
    'PlacaBase', 'FuentePoder', 'Cooler',
    'Controlador RGB', 'Periférico', 'Monitor'
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    //private authService: AuthService
  ) {
   // const user = this.authService.getCurrentUser();
    
    this.productForm = this.fb.group({
      nombre_equipo: ['', [Validators.required, Validators.minLength(3)]],
      tipo_equipo: ['GPU', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      especificaciones: ['', Validators.required],
      cantidad_disponible: [0, [Validators.required, Validators.min(0)]],
      estado: ['nuevo', Validators.required],
      precio_unitario: [0, [Validators.required, Validators.min(0.01)]],
      //id_usuario: [user?.id || null, Validators.required],
      //id_admin: [user?.adminId || null, Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = {
        ...this.productForm.value,
        especificaciones: JSON.stringify(this.productForm.value.especificaciones)
      };

      this.http.post('/api/inventario', formData).subscribe({
        next: (response) => {
          this.router.navigate(['/inventario']);
          this.showSuccessAlert();
        },
        error: (error) => {
          console.error('Error al registrar:', error);
          this.showErrorAlert();
        }
      });
    }
  }

  showSuccessAlert() {
    alert('Producto registrado exitosamente!');
  }

  showErrorAlert() {
    alert('Error al registrar el producto. Por favor intente nuevamente.');
  }

  getErrorMessage(controlName: string): string {
    const control = this.productForm.get(controlName);
    
    if (control?.errors) {
      if (control.hasError('required')) {
        return 'Este campo es obligatorio';
      }
      if (control.hasError('minlength')) {
        return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
      }
      if (control.hasError('min')) {
        return `El valor mínimo permitido es ${control.errors?.['min'].min}`;
      }
    }
    return '';
  }
}