import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-attendance',
  imports: [
    FormsModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    CommonModule
  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {
  filtro = {
    taller: null,
    horario: null
  };

  talleres = [
    { label: 'Taller de Liderazgo', value: 'liderazgo' },
    { label: 'Taller de Oratoria', value: 'oratoria' }
  ];

  horarios = [
    { label: 'Lunes 15:00 – 17:00', value: 'lunes_15' },
    { label: 'Martes 18:00 – 20:00', value: 'martes_18' }
  ];

  listaAsistencia = [
    { nombre: 'Estudiante 1', codigo: '20230000', asistencia: 'Presente' },
    { nombre: 'Estudiante 2', codigo: '20230001', asistencia: 'Presente' },
    { nombre: 'Estudiante 3', codigo: '20230002', asistencia: 'Presente' },
    { nombre: 'Estudiante 4', codigo: '20230003', asistencia: 'Presente' },
    { nombre: 'Estudiante 5', codigo: '20235000', asistencia: 'Presente' }
  ];
}
