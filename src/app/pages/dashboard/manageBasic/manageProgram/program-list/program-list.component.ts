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
import { ProgramFormComponent } from '../program-form/program-form.component';
import { ProgramResponse, ProgramCommand } from '../../../../../core/models/program.model';
import { PageList } from '../../../../../core/models/PageList.model';
import { FilterQuery } from '../../../../../core/models/filterQuery.model';
import { ProgramService } from '../../../../../core/services/program.service';
import { DialogModule } from 'primeng/dialog';
import { Career } from '../../../../../core/models/career.model';
import { CareerService } from '../../../../../core/services/career.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-program-list',
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
    ProgramFormComponent,
    RouterModule
  ],
  templateUrl: './program-list.component.html',
  styleUrl: './program-list.component.css'
})
export class ProgramListComponent implements OnInit, OnDestroy {
  programs: ProgramResponse[] = [];
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

  private searchSubject$ = new Subject<string>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private service: ProgramService,
    private messageService: MessageService,
    private careerService: CareerService
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
          this.first = (resp.page - 1) * resp.sizePage;
          this.rows = resp.sizePage;
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

  onPageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.rows = event.rows;
    const newPage = (this.first / this.rows) + 1;
    if (newPage === this.filterQuery.page) {
      return;
    }
    this.filterQuery.page = newPage;
    this.filterQuery.sizePage = event.rows;
    this.loadWithFilter();
  }
}
