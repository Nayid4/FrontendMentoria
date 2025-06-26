import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ActivityFormComponent } from '../activity-form/activity-form.component';
import {
  AddProgramActivityToProgramCommand,
  ProgramActivityResponse,
  DeleteProgramActivityFromProgramCommand
} from '../../../../../../core/models/programActivity.model';
import { ProgramActivityService } from '../../../../../../core/services/program-activity.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [
    ActivityFormComponent,
    TableModule,
    CommonModule,
    ButtonModule,
    InputIconModule,
    InputTextModule,
    PaginatorModule,
    FormsModule,
    DialogModule,
    RouterModule
  ],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.css'
})
export class ActivityListComponent implements OnInit {
  activities: ProgramActivityResponse[] = [];
  visibleForm = false;
  activity: ProgramActivityResponse | null = null;
  programId: string = '';
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProgramActivityService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.programId = this.route.snapshot.paramMap.get('id')!;
    this.loadActivities();

    // Determinar si el usuario es administrador
    this.authService.dataAuthenticated$.subscribe({
      next: (user) => {
        this.isAdmin = user?.role?.toLowerCase() === 'administrador';
      }
    });
  }

  loadActivities() {
    this.service.getAll(this.programId).subscribe({
      next: (resp) => this.activities = resp ?? [],
      error: () => this.activities = []
    });
  }

  showForm(activity?: ProgramActivityResponse) {
    this.activity = activity ? { ...activity } : null;
    this.visibleForm = true;
  }

  hideForm() {
    this.visibleForm = false;
    this.activity = null;
  }

  registerActivity(cmd: AddProgramActivityToProgramCommand) {
    cmd.idProgram = this.programId;
    this.service.add(cmd).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Actividad registrada' });
        this.hideForm();
        this.loadActivities();
      }
    });
  }

  updateActivity(activity: ProgramActivityResponse) {
    activity.idProgram = this.programId;
    this.service.update(activity).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Actividad actualizada' });
        this.hideForm();
        this.loadActivities();
      }
    });
  }

  deleteActivity(activity: ProgramActivityResponse) {
    const command: DeleteProgramActivityFromProgramCommand = {
      idProgram: this.programId,
      idProgramActivity: activity.id
    };
    this.service.delete(command).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Actividad eliminada' });
        this.loadActivities();
      }
    });
  }

  goToSolutions(activity: ProgramActivityResponse) {
    this.router.navigate([`/dashboard/basicos/programas/${this.programId}/actividades/${activity.id}/soluciones`]);
  }

  // Helper para badge de estado
  getEstadoBadgeClass(estado: string): string {
    switch (estado?.toLowerCase()) {
      case 'activo': return 'bg-green-100 text-green-800';
      case 'completado': return 'bg-gray-100 text-gray-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
