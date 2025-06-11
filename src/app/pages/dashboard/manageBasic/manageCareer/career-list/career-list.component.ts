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
import { CareerFormComponent } from '../career-form/career-form.component';
import { Career, CareerCommand } from '../../../../../core/models/career.model';
import { PageList } from '../../../../../core/models/PageList.model';
import { FilterQuery } from '../../../../../core/models/filterQuery.model';
import { CareerService } from '../../../../../core/services/career.service';

@Component({
  selector: 'app-career-list',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    InputIconModule,
    InputTextModule,
    PaginatorModule,
    FormsModule,
    CareerFormComponent
  ],
  templateUrl: './career-list.component.html',
  styleUrl: './career-list.component.css'
})
export class CareerListComponent implements OnInit, OnDestroy {
  careers: Career[] = [];
  search: string = '';
  first = 0;
  rows = 10;

  visibleForm: boolean = false;
  career: Career | null = null;

  pageList: PageList<Career> = {
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
    private service: CareerService,
    private messageService: MessageService,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
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
        next: (resp: PageList<Career>) => {
          // If backend returns a PageList, update all values. If it returns just an array, assign only Elements.
          this.pageList = resp;

          console.log('PageList:', this.pageList);
          // Optionally update pagination properties if your backend supports it
        },
      });
  }

  onSearch(event: any) {
    this.searchSubject$.next(event.target.value);
  }

  registerCareer(career: CareerCommand) {
    this.service.Create(career)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registered',
            detail: 'Career registered',
          });
          this.service.notifyRegistro(career);
          this.hideForm();
        }
      });
  }

  updateCareer(career: Career) {
    this.service.Update(career.id!, career)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Career updated',
          });
          this.service.notifyRegistro(career);
          this.hideForm();
        }
      });
  }

  deleteCareer(career: Career) {
    this.service.Delete(career.id!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Career deleted',
          });
          this.service.notifyRegistro(career);
        }
      });
  }

  showForm(career?: Career) {
    this.career = career ? { ...career } : null;
    this.visibleForm = true;
  }

  hideForm() {
    this.visibleForm = false;
    this.career = null;
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
