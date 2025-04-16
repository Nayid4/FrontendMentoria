import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home-index',
  imports: [
    RouterModule
  ],
  templateUrl: './home-index.component.html',
  styleUrl: './home-index.component.css'
})
export class HomeIndexComponent {
  titulo: string  = "Nosotros"

  rutaConsultar: string = '/registrar-usuario'
}
