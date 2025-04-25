import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Router, RouterModule } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header-dashboard',
  imports: [
    BreadcrumbModule, 
    RouterModule,
    AvatarModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
  ],
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.css'
})
export class HeaderDashboardComponent  implements OnInit{
  
  @Output() toggleMenu = new EventEmitter<void>();

  nombre: string = ""

  items!: MenuItem[];

  inicial: string = 'A'

  constructor(
    private servicioAute: AuthService, 
    private router: Router,
    private servicioMersaje: MessageService
  ) {
    
  }

  ngOnInit() {

    this.servicioAute.dataAuthenticated$.subscribe({
      next: (datos) => {
        if (datos && datos.name) {
          this.inicial = datos.name[0]; 
          this.nombre = datos.name + ' - ' + datos.role;
        } else {
          this.inicial = 'A';  
          this.nombre = '';
        }
      }
    });
    


    this.items = [
      {
        label: 'Reestablecer Contraseña',
        command: () => {
          this.router.navigate(['/dashboard/user/reset-password'])
        }
      },
      {
        label: 'Cerrar Sesión',
        command: () => {
          this.servicioAute.cerrarSesion()
          this.router.navigate(['/'])
          this.servicioMersaje.add({ severity: 'success', summary: 'Exito', detail: 'Sesion cerrada' });
        }
      }
    ];
  }

  
}