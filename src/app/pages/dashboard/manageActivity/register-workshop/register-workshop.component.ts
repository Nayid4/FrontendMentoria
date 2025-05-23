import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-workshop',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    DialogModule,
    CommonModule
  ],
  templateUrl: './register-workshop.component.html',
  styleUrl: './register-workshop.component.css'
})
export class RegisterWorkshopComponent {
  talleresActivos: any[] = [
    {
      nombre: 'Taller de Oratoria',
      rangoFechas: '1 Mayo – 30 Junio, 2025',
      dias: 'Lunes y Miércoles',
      horario: '15:00 – 17:00',
      lugar: 'Laboratorio 301, Edificio F',
      capacidad: '25/30 participantes'
    },
    {
      nombre: 'Taller de Liderazgo',
      rangoFechas: '15 Abril – 15 Mayo, 2025',
      dias: 'Martes y Jueves',
      horario: '18:00 – 20:00',
      lugar: 'Aula Magna',
      capacidad: '45/50 participantes'
    }
  ];

  showDialog = false;
  editMode = false;
  currentIndex: number | null = null;

  tallerForm = {
    nombre: '',
    rangoFechas: '',
    dias: '',
    horario: '',
    lugar: '',
    capacidad: ''
  };

  abrirDialog(taller?: any, index?: number) {
    if (taller) {
      this.editMode = true;
      this.tallerForm = { ...taller };
      this.currentIndex = index!;
    } else {
      this.editMode = false;
      this.tallerForm = {
        nombre: '',
        rangoFechas: '',
        dias: '',
        horario: '',
        lugar: '',
        capacidad: ''
      };
      this.currentIndex = null;
    }
    this.showDialog = true;
  }

  guardarTaller() {
    if (this.editMode && this.currentIndex !== null) {
      this.talleresActivos[this.currentIndex] = { ...this.tallerForm };
    } else {
      this.talleresActivos.push({ ...this.tallerForm });
    }
    this.showDialog = false;
  }

  eliminarTaller(index: number) {
    if (confirm('¿Está seguro que desea eliminar este taller?')) {
      this.talleresActivos.splice(index, 1);
    }
  }
}
