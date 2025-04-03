import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../inventario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, HttpClientModule, CurrencyPipe],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})

export class InventarioComponent implements OnInit {
  inventario: any[] = [];
  selectedInventario: any = null;
  displayedColumns: string[] = ['nombreEquipo', 'cantidadDisponible', 'precioUnitario', 'imagen', 'acciones'];

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.loadInventarios();
  }

  // Cargar inventarios desde el backend
  loadInventarios() {
    this.inventarioService.getInventario().subscribe((data) => {
      this.inventario = data;
    });
  }

  // Eliminar un inventario
  onDelete(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.inventarioService.deleteInventario(id).subscribe(() => {
        this.loadInventarios();
      });
    }
  }

  // Editar un inventario
  onEdit(inventario: any) {
    this.selectedInventario = { ...inventario };  // Copiar los datos para edición
  }

  // Guardar cambios después de editar
  onSubmit() {
    this.inventarioService.updateInventario(this.selectedInventario.idInventario, this.selectedInventario)
      .subscribe(() => {
        this.loadInventarios();
        this.selectedInventario = null;
      });
  }
}
