import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';

interface LocationUpdate {
  timestamp: Date;
  location: string;
  status: string;
  coordinates?: { lat: number; lng: number };
}

interface TechnicianUpdate {
  timestamp: Date;
  message: string;
  images?: string[];
  parts?: PartReplacement[];
}

interface PartReplacement {
  id: string;
  name: string;
  cost: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  originalPart?: string;
}

interface RepairStatus {
  id: string;
  customerId: string;
  currentStatus: 'collection' | 'transport' | 'diagnosis' | 'repair' | 'quality_check' | 'return' | 'completed';
  estimatedCompletion?: Date;
  technicianNotes?: string;
}

@Component({
  selector: 'app-tracking',
  standalone: true,
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    CurrencyPipe,
    HeaderComponent,
    NavbarComponent
  ],
  providers: [DatePipe, CurrencyPipe]
})
export class TrackingComponent implements OnInit {
  repairRequest = {
    id: 'CBBA-' + Math.floor(10000 + Math.random() * 90000),
    customer: 'Juan Pérez',
    device: 'PC Gamer (Ryzen 7, RTX 3080)',
    problem: 'No enciende, sospecha de falla en fuente de poder',
    statusHistory: [] as RepairStatus[],
    locationUpdates: [] as LocationUpdate[],
    technicianLogs: [] as TechnicianUpdate[],
    pendingActions: [] as PartReplacement[],
    costEstimate: 0,
    warranty: {
      validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      covered: true
    }
  };

  loading = true;
  showMap = false;
  mapUrl = '';
  userDecision: 'pending' | 'approved' | 'rejected' = 'pending';
  newNotification = false;
  currentView: 'timeline' | 'details' | 'updates' = 'timeline';

  private statusMessages = {
    collection: 'Recogiendo equipo en su domicilio',
    transport: 'En transporte al taller',
    diagnosis: 'Realizando diagnóstico',
    repair: 'En proceso de reparación',
    quality_check: 'Control de calidad',
    return: 'Devolviendo equipo',
    completed: 'Reparación completada'
  };

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.initializeSampleData();
    this.simulateRealTimeUpdates();
  }

  private initializeSampleData(): void {
    this.repairRequest.statusHistory = [
      {
        id: '1',
        customerId: 'user123',
        currentStatus: 'collection',
        estimatedCompletion: new Date(new Date().setHours(new Date().getHours() + 2))
      },
      {
        id: '2',
        customerId: 'user123',
        currentStatus: 'transport',
        estimatedCompletion: new Date(new Date().setHours(new Date().getHours() + 1))
      },
      {
        id: '3',
        customerId: 'user123',
        currentStatus: 'diagnosis',
        technicianNotes: 'Fuente de poder quemada, posible daño en placa madre',
        estimatedCompletion: new Date(new Date().setDate(new Date().getDate() + 1))
      }
    ];

    this.repairRequest.locationUpdates = [
      {
        timestamp: new Date(new Date().setHours(9, 0)),
        location: 'Domicilio del cliente',
        status: 'Recogida programada',
        coordinates: { lat: -17.3935, lng: -66.1570 }
      },
      {
        timestamp: new Date(new Date().setHours(10, 30)),
        location: 'En tránsito',
        status: 'En camino al taller',
        coordinates: { lat: -17.3960, lng: -66.1560 }
      },
      {
        timestamp: new Date(new Date().setHours(11, 15)),
        location: 'Taller Central',
        status: 'Recibido en taller',
        coordinates: { lat: -17.3897, lng: -66.1608 }
      }
    ];

    this.repairRequest.technicianLogs = [
      {
        timestamp: new Date(new Date().setHours(11, 30)),
        message: 'Diagnóstico inicial: Fuente de poder no responde',
        images: ['/assets/repair-1.jpg']
      },
      {
        timestamp: new Date(new Date().setHours(12, 15)),
        message: 'Confirmado: Fuente de poder quemada, revisando placa madre',
        images: ['/assets/repair-2.jpg', '/assets/repair-3.jpg']
      }
    ];

    this.repairRequest.pendingActions = [
      {
        id: 'part-001',
        name: 'Fuente de poder 750W 80+ Gold',
        cost: 850,
        description: 'Reemplazo necesario por falla total',
        status: 'pending',
        originalPart: 'Fuente de poder 600W genérica'
      },
      {
        id: 'part-002',
        name: 'Placa madre B550',
        cost: 1200,
        description: 'Posible daño por cortocircuito',
        status: 'pending',
        originalPart: 'Placa madre B450'
      }
    ];

    this.calculateTotalEstimate();
    this.loading = false;
  }

  private calculateTotalEstimate(): void {
    this.repairRequest.costEstimate = this.repairRequest.pendingActions
      .filter(part => part.status !== 'rejected')
      .reduce((sum, part) => sum + part.cost, 0);
  }

  private simulateRealTimeUpdates(): void {
    setTimeout(() => {
      this.repairRequest.locationUpdates.push({
        timestamp: new Date(),
        location: 'Taller Central - Área de diagnóstico',
        status: 'En proceso de evaluación técnica',
        coordinates: { lat: -17.3897, lng: -66.1608 }
      });
      this.newNotification = true;
    }, 15000);

    setTimeout(() => {
      this.repairRequest.technicianLogs.push({
        timestamp: new Date(),
        message: 'Diagnóstico completo: Requiere reemplazo de fuente de poder y revisión de placa madre',
        images: ['/assets/repair-4.jpg']
      });
      this.newNotification = true;
    }, 30000);
  }

  respondToPart(partId: string, decision: 'approved' | 'rejected'): void {
    const part = this.repairRequest.pendingActions.find(p => p.id === partId);
    if (part) {
      part.status = decision;
      this.repairRequest.technicianLogs.push({
        timestamp: new Date(),
        message: `Cliente ${decision === 'approved' ? 'aprobó' : 'rechazó'} el reemplazo de ${part.name} (${part.cost} Bs.)`
      });
      this.calculateTotalEstimate();
      this.newNotification = true;
    }
  }

  getCurrentStatus(): string {
    const latestStatus = this.repairRequest.statusHistory[this.repairRequest.statusHistory.length - 1];
    return this.statusMessages[latestStatus.currentStatus] || 'Estado desconocido';
  }

  getProgressPercentage(): number {
    const statusOrder = ['collection', 'transport', 'diagnosis', 'repair', 'return', 'completed'];
    const currentStatus = this.repairRequest.statusHistory[this.repairRequest.statusHistory.length - 1]?.currentStatus;
    const currentIndex = statusOrder.indexOf(currentStatus);
    return (currentIndex / (statusOrder.length - 1)) * 100;
  }

  viewPartDetails(part: PartReplacement): void {
    alert(`Detalle de pieza:\n${part.name}\nPrecio: ${part.cost} Bs.\nMotivo: ${part.description}`);
  }

  generateMapUrl(): void {
    const lastLocation = this.repairRequest.locationUpdates[this.repairRequest.locationUpdates.length - 1];
    if (lastLocation?.coordinates) {
      this.mapUrl = `https://maps.google.com/maps?q=${lastLocation.coordinates.lat},${lastLocation.coordinates.lng}&z=15&output=embed`;
      this.showMap = true;
    }
  }

  getCurrentStatusClass(status: string): boolean {
    const currentStatus = this.repairRequest.statusHistory[this.repairRequest.statusHistory.length - 1]?.currentStatus;
    const statusOrder = ['collection', 'transport', 'diagnosis', 'repair', 'return'];
    return statusOrder.indexOf(currentStatus) >= statusOrder.indexOf(status);
  }
}