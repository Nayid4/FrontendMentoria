import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    DialogModule
  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {
  filtro = { taller: null, horario: null };

  talleres = [
    { label: 'Taller de Liderazgo', value: 'liderazgo' },
    { label: 'Taller de Oratoria', value: 'oratoria' }
  ];

  horarios = [
    { label: 'Lunes 15:00 – 17:00', value: 'lunes_15' },
    { label: 'Martes 18:00 – 20:00', value: 'martes_18' }
  ];

  datosBase: any = {
    liderazgo: {
      lunes_15: [],
      martes_18: []
    },
    oratoria: {
      lunes_15: [],
      martes_18: []
    }
  };

  listaAsistencia: any[] = [];

  showDialog = false;
  editMode = false;
  currentEstudiante: any = { nombre: '', codigo: '', asistencia: 'Presente' };

  cargarLista() {
    const { taller, horario } = this.filtro;
    if (taller && horario) {
      this.listaAsistencia = [...this.datosBase[taller][horario]];
    }
  }

  guardarAsistencia() {
    const { taller, horario } = this.filtro;
    if (taller && horario) {
      this.datosBase[taller][horario] = [...this.listaAsistencia];
      alert('Asistencia guardada correctamente ✅');
    } else {
      alert('Por favor seleccione un taller y un horario antes de guardar la asistencia.');
    }
  }

  abrirDialog(estudiante?: any, index?: number) {
    if (estudiante) {
      this.currentEstudiante = { ...estudiante, index };
      this.editMode = true;
    } else {
      this.currentEstudiante = { nombre: '', codigo: '', asistencia: 'Presente' };
      this.editMode = false;
    }
    this.showDialog = true;
  }

  guardarEstudiante() {
    if (this.editMode) {
      this.listaAsistencia[this.currentEstudiante.index] = {
        nombre: this.currentEstudiante.nombre,
        codigo: this.currentEstudiante.codigo,
        asistencia: this.currentEstudiante.asistencia
      };
    } else {
      this.listaAsistencia.push({ ...this.currentEstudiante });
    }
    this.showDialog = false;
  }

  eliminarEstudiante(index: number) {
    this.listaAsistencia.splice(index, 1);
  }
}
