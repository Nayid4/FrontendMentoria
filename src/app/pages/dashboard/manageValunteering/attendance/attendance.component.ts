import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-attendance',
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {
  programas = [
    { nombre: 'Desarrollo Web con React', tipo: 'Taller', fecha: '15/04/2025', participantes: 24 },
    { nombre: 'Introducción a Python', tipo: 'Taller', fecha: '20/04/2025', participantes: 18 },
    { nombre: 'Voluntariado Ambiental', tipo: 'Voluntariado', fecha: '25/04/2025', participantes: 15 },
    { nombre: 'Diseño UX/UI', tipo: 'Taller', fecha: '28/04/2025', participantes: 15 }
  ];
}
