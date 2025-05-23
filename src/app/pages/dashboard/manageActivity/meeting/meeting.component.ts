import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-meeting',
  imports: [
    TabViewModule,
    ButtonModule
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
}
