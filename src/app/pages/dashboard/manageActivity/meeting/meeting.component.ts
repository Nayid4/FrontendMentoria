import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [
    TabViewModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent {
  reuniones = [
    {
      titulo: 'Tutoría Independiente',
      descripcion: 'Revisión de proyectos finales',
      fecha: '30 de Abril, 2025',
      hora: '10:00 - 11:30'
    },
    {
      titulo: 'Proyectos Sociales',
      descripcion: 'Revisión de avances del capítulo 3',
      fecha: '2 de Mayo, 2025',
      hora: '14:00 - 15:00'
    }
  ];

  showDialog = false;
  editMode = false;
  currentIndex: number | null = null;

  currentReunion = {
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: ''
  };

  abrirDialog(reunion?: any, index?: number) {
    if (reunion) {
      this.currentReunion = { ...reunion };
      this.currentIndex = index!;
      this.editMode = true;
    } else {
      this.currentReunion = {
        titulo: '',
        descripcion: '',
        fecha: '',
        hora: ''
      };
      this.editMode = false;
      this.currentIndex = null;
    }
    this.showDialog = true;
  }

  guardarReunion() {
    if (this.editMode && this.currentIndex !== null) {
      this.reuniones[this.currentIndex] = { ...this.currentReunion };
    } else {
      this.reuniones.push({ ...this.currentReunion });
    }
    this.showDialog = false;
  }

  eliminarReunion(index: number) {
    this.reuniones.splice(index, 1);
  }
}
