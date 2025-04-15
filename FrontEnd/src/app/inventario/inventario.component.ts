import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../inventario.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    CurrencyPipe,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  inventario: any[] = [];
  selectedInventario: any = null;
  displayedColumns: string[] = [
    'nombreEquipo', 
    'cantidadDisponible', 
    'precioUnitario', 
    'imagen', 
    'acciones'
  ];

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.loadInventarios();
  }

  loadInventarios() {
    this.inventarioService.getInventario().subscribe({
      next: (data) => this.inventario = data,
      error: (err) => console.error('Error cargando inventario:', err)
    });
  }

  onDelete(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.inventarioService.deleteInventario(id).subscribe({
        next: () => this.loadInventarios(),
        error: (err) => console.error('Error eliminando:', err)
      });
    }
  }

  onEdit(inventario: any) {
    this.selectedInventario = { ...inventario };
  }

  onSubmit() {
    if (this.selectedInventario) {
      this.inventarioService.updateInventario(
        this.selectedInventario.idInventario,
        this.selectedInventario
      ).subscribe({
        next: () => {
          this.loadInventarios();
          this.selectedInventario = null;
        },
        error: (err) => console.error('Error actualizando:', err)
      });
    }
  }
}