import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent  implements OnInit {
  ruta: string = '/';

  constructor(private servicioAutenticacion: AuthService) {
    
  }

  ngOnInit(): void {
    this.servicioAutenticacion.authenticated$.subscribe((logeado: boolean) => {
      if (logeado) {
        this.ruta = '/dashboard';
      }{
        this.ruta = '/';}
    });
  }

}