import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

type ProductCategory = 'GPU' | 'CPU' | 'RAM' | 'Almacenamiento' | 'PlacaBase' | 'FuentePoder' | 'Cooler';

@Component({
  selector: 'app-producto-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './producto-registro.component.html',
  styleUrls: ['./producto-registro.component.css']
})
export class ProductoRegistroComponent {
  productForm: FormGroup;
  categories: ProductCategory[] = ['GPU', 'CPU', 'RAM', 'Almacenamiento', 'PlacaBase', 'FuentePoder', 'Cooler'];
  currentSpecs: { [key: string]: any } = {};
  Object = Object; // Exponer Object al template

  // Mapeo de especificaciones técnicas
  categorySpecs = {
    GPU: {
      vram: ['', [Validators.required, Validators.min(1)]],
      tipoMemoria: ['GDDR6', Validators.required],
      interfaz: ['PCIe 4.0', Validators.required],
      velocidadReloj: ['', Validators.required]
    },
    CPU: {
      nucleos: ['', [Validators.required, Validators.min(1)]],
      hilos: ['', Validators.required],
      velocidadBase: ['', Validators.required],
      socket: ['', Validators.required]
    },
    RAM: {
      capacidad: ['', Validators.required],
      tipo: ['DDR4', Validators.required],
      velocidad: ['', Validators.required],
      latencia: ['', Validators.required]
    },
    Almacenamiento: {
      tipo: ['SSD', Validators.required],
      capacidad: ['', Validators.required],
      interfaz: ['SATA III', Validators.required],
      velocidadLectura: ['', Validators.required]
    },
    PlacaBase: {
      socket: ['', Validators.required],
      chipset: ['', Validators.required],
      formato: ['ATX', Validators.required],
      ranurasRAM: ['', Validators.required]
    },
    FuentePoder: {
      potencia: ['', Validators.required],
      certificacion: ['80 Plus Bronze', Validators.required],
      modular: ['No', Validators.required]
    },
    Cooler: {
      tipo: ['Aire', Validators.required],
      altura: ['', Validators.required],
      tdp: ['', Validators.required],
      ruido: ['', Validators.required]
    }
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['GPU', Validators.required],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required],
      especificaciones: this.fb.group({}),
      imagen: ['', Validators.required]
    });

    this.updateSpecs('GPU');
  }

  // Métodos auxiliares
  getSpecLabel(specKey: string): string {
    const labels: { [key: string]: string } = {
      vram: 'VRAM (GB)',
      tipoMemoria: 'Tipo de Memoria',
      interfaz: 'Interfaz',
      velocidadReloj: 'Velocidad de Reloj (MHz)',
      nucleos: 'Núcleos',
      hilos: 'Hilos',
      velocidadBase: 'Velocidad Base (GHz)',
      socket: 'Socket',
      capacidad: 'Capacidad (GB)',
      tipo: 'Tipo',
      velocidad: 'Velocidad (MHz)',
      latencia: 'Latencia',
      velocidadLectura: 'Velocidad Lectura (MB/s)',
      chipset: 'Chipset',
      formato: 'Formato',
      ranurasRAM: 'Ranuras RAM',
      potencia: 'Potencia (W)',
      certificacion: 'Certificación',
      modular: 'Modular',
      altura: 'Altura (mm)',
      tdp: 'TDP (W)',
      ruido: 'Ruido (dB)'
    };
    return labels[specKey] || specKey;
  }

  getInputType(specKey: string): string {
    const numberFields = [
      'vram', 'nucleos', 'hilos', 'velocidadBase', 'capacidad',
      'velocidad', 'latencia', 'velocidadLectura', 'ranurasRAM',
      'potencia', 'altura', 'tdp', 'ruido'
    ];
    return numberFields.includes(specKey) ? 'number' : 'text';
  }

  getPlaceholder(specKey: string): string {
    const placeholders: { [key: string]: string } = {
      vram: 'Ej: 8',
      tipoMemoria: 'Ej: GDDR6',
      interfaz: 'Ej: PCIe 4.0',
      velocidadReloj: 'Ej: 1710',
      nucleos: 'Ej: 6',
      hilos: 'Ej: 12',
      velocidadBase: 'Ej: 3.6',
      socket: 'Ej: AM4',
      capacidad: 'Ej: 16',
      tipo: 'Ej: DDR4',
      velocidad: 'Ej: 3200',
      latencia: 'Ej: CL16',
      velocidadLectura: 'Ej: 3500',
      chipset: 'Ej: B550',
      formato: 'Ej: ATX',
      ranurasRAM: 'Ej: 4',
      potencia: 'Ej: 750',
      certificacion: 'Ej: 80 Plus Gold',
      modular: 'Ej: Sí/No',
      altura: 'Ej: 160',
      tdp: 'Ej: 65',
      ruido: 'Ej: 25'
    };
    return placeholders[specKey] || 'Ingrese valor';
  }

  updateSpecs(category: ProductCategory) {
    const specGroup = this.fb.group(this.categorySpecs[category]);
    this.productForm.setControl('especificaciones', specGroup);
    this.currentSpecs = this.categorySpecs[category];
  }

  onCategoryChange(event: Event) {
    const category = (event.target as HTMLSelectElement).value as ProductCategory;
    this.updateSpecs(category);
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      console.log('Producto a registrar:', productData);
      this.http.post('/api/productos', productData).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: (error) => console.error('Error al registrar:', error)
      });
    }
  }
}