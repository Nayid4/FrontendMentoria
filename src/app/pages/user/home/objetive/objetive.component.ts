import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-objetive',
  imports: [
    RouterModule
  ],
  templateUrl: './objetive.component.html',
  styleUrl: './objetive.component.css',
})
export class ObjetiveComponent {
  rutaInscripcion: string = '/inscripcion';
}
