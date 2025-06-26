import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { DataUser } from '../../../core/models/dataUser.model';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { MentorAssignmentService } from '../../../core/services/mentor-assignment.service';
import { MentorAssignmentUsersResponse } from '../../../core/models/mentorAssignment.model';
import { CommonModule } from '@angular/common';
import { Role } from '../../../core/models/role.model';
import { RoleService } from '../../../core/services/role.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-dashboard',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css',
})
export class HomeDashboardComponent implements OnInit, OnDestroy {
  horaActual: string = '';
  private intervalo: any;
  user!: DataUser;

  roles!: Role[]
roleSeleccionado: string = '';
  usuariosPorRol: User[] = [];

  mentores: User[] = [];
  mentorAsignado: User | null = null;
  isIngresante: boolean = false;

  constructor(
    private authService: AuthService, 
    private userService: UserService,
    private mentorAssignmentService: MentorAssignmentService,
    private roleService: RoleService // Asegúrate de importar el servicio de roles si lo necesitas
  ) {}

  ngOnInit(): void {
    this.actualizarHora();
    this.intervalo = setInterval(() => this.actualizarHora(), 1000); // Actualiza cada segundo


    this.authService.dataAuthenticated$.subscribe({
      next: (resp) => {
        this.user = resp;
        this.cargarRoles();
        this.cargarMentores();
        this.verificarMentorAsignado();
      },
    });
  }


  ngOnDestroy(): void {
    clearInterval(this.intervalo); // Evita memory leaks
  }

  cargarRoles() {
    // Carga los roles disponibles desde el servicio
    this.roleService.GetAll().subscribe({
      next: (resp) => {
        this.roles = resp;
      },
      error: () => {
        this.roles = [];
      }
    });
  }

  cargarMentores() {
    // Filtra usuarios con el rol "Mentor"
    this.userService.GetByFilter({
      searchTerm: 'Mentor',
      orderColumn: '',
      orderList: 'asc',
      page: 1,
      sizePage: 10,
    }).subscribe({
      next: (resp) => {
        this.mentores = resp.elements
      },
      error: () => {
        this.mentores = [];
      }
    });
  }

  buscarPorRol() {
    if (!this.roleSeleccionado) {
      this.usuariosPorRol = [];
      return;
    }
    this.userService.GetByFilter({
      searchTerm: this.roleSeleccionado,
      orderColumn: '',
      orderList: 'asc',
      page: 1,
      sizePage: 5,
    }).subscribe({
      next: (resp) => {
        this.usuariosPorRol = resp.elements;
      },
      error: () => {
        this.usuariosPorRol = [];
      }
    });
  }

  verificarMentorAsignado() {
    // Si el usuario actual es Ingresante, busca su mentor asignado
    if (this.user && this.user.role && this.user.role.toLowerCase() === 'ingresante') {
      this.isIngresante = true;
      this.mentorAssignmentService.getByUser(this.user.id).subscribe({
        next: (resp: MentorAssignmentUsersResponse) => {
          this.mentorAsignado = resp.mentor;
        },
        error: () => {
          this.mentorAsignado = null;
        }
      });
    } else {
      this.isIngresante = false;
      this.mentorAsignado = null;
    }
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
