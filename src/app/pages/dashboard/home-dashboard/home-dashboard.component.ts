import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { DataUser } from '../../../core/models/dataUser.model';

@Component({
  selector: 'app-home-dashboard',
  imports: [],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css',
})
export class HomeDashboardComponent implements OnInit, OnDestroy {
  horaActual: string = '';
  private intervalo: any;
  user!: DataUser;

  constructor(
    private authService: AuthService, 
  ) {}

  ngOnInit(): void {
    this.actualizarHora();
    this.intervalo = setInterval(() => this.actualizarHora(), 1000); // Actualiza cada segundo

    this.authService.dataAuthenticated$.subscribe({
      next: (resp) => {
        this.user = resp;
      },
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo); // Evita memory leaks
  }

  private actualizarHora(): void {
    const ahora = new Date();
    this.horaActual = ahora.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  copiarUsuarioAlPortapapeles(userName: string): void {
    navigator.clipboard.writeText(userName).then(() => {
      // Opcional: Mostrar mensaje de éxito
      console.log('¡Usuario copiado al portapapeles!');
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  }
  
}
