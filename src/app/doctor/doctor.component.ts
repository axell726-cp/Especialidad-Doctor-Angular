import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Doctor } from './models/doctor';
import { Especialidad } from '../especialidad/models/especialidad';
import { EspecialidadService } from '../especialidad/services/especialidad.service';
import { DoctorService } from './services/doctor.service';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [SidebarComponent, CardModule, TableModule, PanelModule, ToastModule, 
    ConfirmDialogModule, DropdownModule, DialogModule, InputTextModule, FormsModule],
    providers: [MessageService, ConfirmationService],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {

  cargarEspecialidadesActivas() {
    this.especialidadService.getEspecialidades().subscribe({
      next: (data) => {
        this.especialidadOpttion = data;
        console.log(data)
      },
      error: (error) => {
        console.error('Error al cargar las especialidad activas', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las especialidad activas',
        });
      }
    });

  }
  especialidadOpttion: Especialidad[]=[];
  doctores!: Doctor[];
  isDeleteInProgress: boolean = false;
  titulo: string = '';
  opc: string = '';
  op = 0;
  visible: boolean = false;
  doctor = new Doctor(0, '', '', new Especialidad(0, ''));

  constructor(
    private doctorService: DoctorService, 
    private messageService: MessageService,
    private especialidadService: EspecialidadService
  ) {}

  ngOnInit() {
    this.listarDoctores();
    this.cargarEspecialidadesActivas();
  }

  listarDoctores(){
    this.doctorService.getDoctors().subscribe((data) => {
      this.doctores = data;
    });
  }

  deleteDoctor(id: number) {
    this.isDeleteInProgress = true;
    this.doctorService.deleteDoctor(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Doctor eliminado',
        });
        this.isDeleteInProgress = false;
        this.listarDoctores();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el doctor',
        });
      },
    });
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Doctor';
    this.opc = 'Editar';
    this.doctorService.getDoctorByID(id).subscribe((data) => {
      this.doctor = data;
      this.op = 1;
      this.visible = true;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Doctor';
    this.opc = 'Agregar';
    this.op = 0;
    this.visible = true;
    this.doctor = {
      id: 0,
      nombres: '',
      apellidos: '',
      especialidad: {
        id: 0,
        nombre: ''
      }
    };
  }

  addDoctor(): void {
    if (!this.doctor.nombres || this.doctor.nombres.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre del doctor no puede estar vacío',
      });
      return;
    }

    this.doctorService.crearDoctor(this.doctor).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Doctor registrado',
        });
        this.listarDoctores();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el doctor',
        });
      },
    });
    this.visible = false;
  }
  
  updateDoctor() {
    this.doctorService.updateDoctor(this.doctor.id, this.doctor).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success', 
          summary: 'Correcto',
          detail: 'Doctor editado',
        });
        this.listarDoctores();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error', 
          detail: 'No se pudo editar el doctor',
        });
      },
    });
    this.visible = false;
  }
}
