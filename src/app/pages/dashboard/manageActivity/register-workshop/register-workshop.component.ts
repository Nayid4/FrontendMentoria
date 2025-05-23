import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-register-workshop',
  imports: [
    FormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    TabViewModule
  ],
  templateUrl: './register-workshop.component.html',
  styleUrl: './register-workshop.component.css'
})
export class RegisterWorkshopComponent {
  talleresActivos = [
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
}
