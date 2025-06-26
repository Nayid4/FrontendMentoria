import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MentorAssignmentFormComponent } from '../mentor-assignment-form/mentor-assignment-form.component';
import { DialogModule } from 'primeng/dialog';
import { MentorAssignmentCreateCommand, MentorAssignmentResponse, MentorAssignmentUpdateCommand } from '../../../../core/models/mentorAssignment.model';
import { FilterQuery } from '../../../../core/models/filterQuery.model';
import { User } from '../../../../core/models/user.model';
import { MentorAssignmentService } from '../../../../core/services/mentor-assignment.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    InputIconModule,
    InputTextModule,
    PaginatorModule,
    FormsModule,
    DialogModule,
    MentorAssignmentFormComponent,
  ],
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit, OnDestroy {
  assignments: MentorAssignmentResponse[] = [];
  search: string = '';
  first = 0;
  rows = 10;

  visibleForm: boolean = false;
  assignment: MentorAssignmentResponse | null = null;
  mentors: User[] = [];
  ingresantes: User[] = [];

  filterQuery: FilterQuery = {
    searchTerm: '',
    orderColumn: '',
    orderList: 'asc',
    page: 1,
    sizePage: 10
  };

  private searchSubject$ = new Subject<string>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private service: MentorAssignmentService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadAssignments();
    this.loadUsers();
    this.searchSubject$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(term => {
        this.filterQuery.searchTerm = term;
        this.filterQuery.page = 1;
        this.loadAssignments();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadAssignments() {
    this.service.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp) => this.assignments = resp ?? [],
        error: () => this.assignments = []
      });
  }

  loadUsers() {
    // Cargar mentores
    this.userService.GetByFilter({
      searchTerm: '',
      orderColumn: '',
      orderList: 'asc',
      page: 1,
      sizePage: 100,
    }).subscribe({
      next: (result) => {
        this.mentors = (result.elements ?? []).filter(u => u.role?.name === 'Mentor');
        this.ingresantes = (result.elements ?? []).filter(u => u.role?.name === 'Ingresante');
      },
      error: () => {
        this.mentors = [];
        this.ingresantes = [];
      }
    });
  }

  onSearch(event: any) {
    this.searchSubject$.next(event.target.value);
  }

  showForm(assignment?: MentorAssignmentResponse) {
    this.assignment = assignment ? { ...assignment } : null;
    this.visibleForm = true;
  }

  hideForm() {
    this.visibleForm = false;
    this.assignment = null;
  }

  registerAssignment(cmd: MentorAssignmentCreateCommand) {
    this.service.create(cmd).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registrado',
          detail: 'Asignación registrada',
        });
        this.loadAssignments();
        this.hideForm();
      }
    });
  }

  updateAssignment(cmd: MentorAssignmentUpdateCommand | any) {
    this.service.update(cmd.id!, cmd).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: 'Asignación actualizada',
        });
        this.loadAssignments();
        this.hideForm();
      }
    });
  }

  deleteAssignment(assignment: MentorAssignmentResponse) {
    this.service.delete(assignment.id!).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Asignación eliminada',
        });
        this.loadAssignments();
      }
    });
  }

  assignAutomaticAssignments() {
  this.service.assignAutomatic().subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Asignación automática',
        detail: 'La asignación automática de mentores se realizó correctamente.',
      });
      this.loadAssignments();
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ocurrió un error al asignar mentores automáticamente.',
      });
    }
  });
}

}
