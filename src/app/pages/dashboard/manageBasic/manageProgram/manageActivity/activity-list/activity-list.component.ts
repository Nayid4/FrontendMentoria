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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProgramActivityService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.programId = this.route.snapshot.paramMap.get('id')!;
    this.loadActivities();
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
    // El comando debe llevar el id del programa.
    cmd.idProgram = this.programId;

    console.log('Comando a registrar:', cmd);
    this.service.add(cmd).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Actividad registrada' });
        this.hideForm();
        this.loadActivities();
      }
    });
  }

  // NUEVO: Actualizar actividad existente
  updateActivity(activity: ProgramActivityResponse) {
    // Asegura que la actividad tenga el idProgram correcto
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
    // Debe enviarse el objeto DeleteProgramActivityFromProgramCommand
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
    this.router.navigate([`/ruta/del/programa/${this.programId}/actividades/${activity.id}/soluciones`]);
    // Ajusta la ruta según tu módulo de rutas
  }
}
