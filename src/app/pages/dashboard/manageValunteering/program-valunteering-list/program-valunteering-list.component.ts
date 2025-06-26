import { Component } from '@angular/core';
import { ProgramCommand, ProgramResponse } from '../../../../core/models/program.model';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { PageList } from '../../../../core/models/PageList.model';
import { CareerService } from '../../../../core/services/career.service';
import { MessageService } from 'primeng/api';
import { ProgramService } from '../../../../core/services/program.service';
import { FilterQuery } from '../../../../core/models/filterQuery.model';
import { Career } from '../../../../core/models/career.model';
import { RouterModule } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { ProgramFormComponent } from '../../manageBasic/manageProgram/program-form/program-form.component';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-program-valunteering-list',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    InputIconModule,
    InputTextModule,
    PaginatorModule,
    FormsModule,
    DialogModule,
    ProgramFormComponent,
    RouterModule
  ],
  templateUrl: './program-valunteering-list.component.html',
  styleUrl: './program-valunteering-list.component.css'
})
export class ProgramValunteeringListComponent {
  search: string = '';
  first = 0;
  rows = 10;

  visibleForm: boolean = false;
  program: ProgramResponse | null = null;
  careers: Career[] = [];

  pageList: PageList<ProgramResponse> = {
    elements: [],
    page: 1,
    sizePage: 10,
    totalAmount: 0,
    hasNextPage: false,
    hasPreviousPage: false
  };

  filterQuery: FilterQuery = {
    searchTerm: '',
    orderColumn: 'name',
    orderList: 'asc',
    page: 1,
    sizePage: 10
  };

  isAdmin = false;

  private searchSubject$ = new Subject<string>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private service: ProgramService,
    private messageService: MessageService,
    private careerService: CareerService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.loadCareers();
    this.loadWithFilter();

    this.service.Registro$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (registro) => {
        if (registro) {
          this.loadWithFilter();
        }
      },
    );

    this.authService.dataAuthenticated$.subscribe({
      next: (user) => {
        this.isAdmin = user?.role?.toLowerCase() === 'administrador';
      }
    });

    this.searchSubject$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(term => {
        this.filterQuery.searchTerm = term;
        this.filterQuery.page = 1;
        this.loadWithFilter();
      });
  }

  loadWithFilter() {
    this.service
      .GetByFilter(this.filterQuery)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: PageList<ProgramResponse>) => {
          this.pageList = resp;
          this.first = 0; // Siempre reinicia al cargar filtro/búsqueda
        },
      });
  }

  loadCareers() {
    this.careerService.GetAll().subscribe({
      next: (careers) => {
        this.careers = careers;
      },
      error: () => {
        this.careers = [];
      }
    });
  }

  onSearch(event: any) {
    this.searchSubject$.next(event.target.value);
  }

  registerProgram(program: ProgramCommand) {
    this.service.Create(program)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registrado',
            detail: 'Programa registrado',
          });
          this.service.notifyRegistro(program);
          this.hideForm();
        }
      });
  }

  updateProgram(program: ProgramResponse) {
    this.service.Update(program.id!, program)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Programa actualizado',
          });
          this.service.notifyRegistro(program);
          this.hideForm();
        }
      });
  }

  deleteProgram(program: ProgramResponse) {
    this.service.Delete(program.id!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Programa eliminado',
          });
          this.service.notifyRegistro(program);
        }
      });
  }

  showForm(program?: ProgramResponse) {
    this.program = program ? { ...program } : null;
    this.visibleForm = true;
  }

  hideForm() {
    this.visibleForm = false;
    this.program = null;
  }

  onSortChange(event: { field: string, order: number }) {
    this.filterQuery.orderColumn = event.field;
    this.filterQuery.orderList = event.order === 1 ? 'asc' : 'desc';
    this.filterQuery.page = 1;
    this.loadWithFilter();
  }

  onPageChange(event: PaginatorState) {
    const first = event.first ?? 0;
    const rows = event.rows ?? 10;
    this.first = first;
    this.rows = rows;
  }

  /** Solo voluntariados filtrados y paginados */
  get volunteeringPrograms(): ProgramResponse[] {
    const filtrados = this.pageList.elements.filter(
      p => p.type && p.type.toLowerCase() === 'voluntariado'
    );
    return filtrados.slice(this.first, this.first + this.rows);
  }

  get volunteeringTotal(): number {
    return this.pageList.elements.filter(
      p => p.type && p.type.toLowerCase() === 'voluntariado'
    ).length;
  }
}
