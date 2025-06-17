import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramActivitySolutionResponse, AddSolutionToProgramActivityCommand, DeleteSolutionCommand, ActivitySolutionUpdateCalificationCommand } from '../../../../../../../core/models/programActivitySolution.model';
import { ProgramActivitySolutionService } from '../../../../../../../core/services/program-activity-solution.service';
import { FileService } from '../../../../../../../core/services/file.service';
import { MessageService } from 'primeng/api';
import { User } from '../../../../../../../core/models/user.model';
import { UserService } from '../../../../../../../core/services/user.service';
import { ActivitySolutionFormComponent } from '../activity-solution-form/activity-solution-form.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-activity-solution-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ActivitySolutionFormComponent,
  ],
  templateUrl: './activity-solution-list.component.html',
  styleUrl: './activity-solution-list.component.css'
})
export class ActivitySolutionListComponent implements OnInit {
  solutions: ProgramActivitySolutionResponse[] = [];
  users: User[] = [];
  visibleForm: boolean = false;
  programActivityId: string = '';
  calificationEdit: { [key: string]: boolean } = {};
  calificationValue: { [key: string]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private service: ProgramActivitySolutionService,
    private userService: UserService,
    private fileService: FileService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.programActivityId = this.route.snapshot.paramMap.get('idActividad')!;
    this.loadSolutions();
    this.loadUsers();
  }

  loadSolutions() {
    this.service.getAll(this.programActivityId).subscribe({
      next: (resp) => {
        this.solutions = resp ?? [];
      },
      error: () => this.solutions = []
    });
  }

  loadUsers() {
    this.userService.GetAll().subscribe(users => {
      this.users = users ?? [];
    });
  }

  showForm() {
    this.visibleForm = true;
  }

  hideForm() {
    this.visibleForm = false;
  }

  addSolution(cmd: AddSolutionToProgramActivityCommand) {
    this.service.create(cmd).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Solución registrada' });
        this.hideForm();
        this.loadSolutions();
      }
    });
  }

  deleteSolution(solution: ProgramActivitySolutionResponse) {
    const command: DeleteSolutionCommand = {
      idProgramActivity: solution.idProgramActivity,
      idProgramActivitySolution: solution.id
    };
    this.service.delete(command).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Solución eliminada' });
        this.loadSolutions();
      }
    });
  }

  // Descargar archivo
  downloadFile(idFile: string) {
    this.fileService.download(idFile).subscribe(blob => {
      this.fileService.saveBlobAsFile(blob, `solucion_${idFile}`); // Cambia la extensión si corresponde
    });
  }

  // Editar calificación
  startEditCalification(id: string, calification: number) {
    this.calificationEdit[id] = true;
    this.calificationValue[id] = calification;
  }

  saveCalification(solution: ProgramActivitySolutionResponse) {
    const command: ActivitySolutionUpdateCalificationCommand = {
      idProgramActivity: solution.idProgramActivity,
      idProgramActivitySolution: solution.id,
      calification: this.calificationValue[solution.id]
    };
    this.service.updateCalification(command).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Calificado', detail: 'Calificación actualizada' });
        this.calificationEdit[solution.id] = false;
        this.loadSolutions();
      }
    });
  }

  getUserName(userId: string): string {
  const user = this.users.find(u => u.id === userId);
  if (!user) return '';
  const pi = user.personalInformation;
  return pi ? `${pi.name} ${pi.lastName}` : '';
}

}
