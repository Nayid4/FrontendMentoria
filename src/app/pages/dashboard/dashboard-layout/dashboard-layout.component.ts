import { ChangeDetectorRef, Component, OnInit, WritableSignal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingService } from '../../../core/services/loading.service';
import { HeaderDashboardComponent } from '../../../shared/components/header-dashboard/header-dashboard.component';
import { SideMenuDashboardComponent } from '../../../shared/components/side-menu-dashboard/side-menu-dashboard.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../extras/loading/loading.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    HeaderDashboardComponent,
    SideMenuDashboardComponent,
    CommonModule,
    LoadingComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent implements OnInit {

  isMenuVisible: boolean = true;
  isLoading: boolean = false;
  cargando!: WritableSignal<boolean>;

  constructor(
    private autenticacionServicio: AuthService,
    private cargandoService: LoadingService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ){}

  ngOnInit(): void {

    this.cargando = this.cargandoService.loading;

    if (this.autenticacionServicio.token) {
      this.autenticacionServicio.DataUser().subscribe({
        error: () => {
          this.autenticacionServicio.cerrarSesion();
          this.router.navigate(['/inicio']);
        }
      });
    }
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}

