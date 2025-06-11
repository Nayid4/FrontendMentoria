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
import { RoleFormComponent } from '../role-form/role-form.component';
import { Role, RoleCommand } from '../../../../../core/models/role.model';
import { PageList } from '../../../../../core/models/PageList.model';
import { FilterQuery } from '../../../../../core/models/filterQuery.model';
import { RoleService } from '../../../../../core/services/role.service';

@Component({
  selector: 'app-role-list',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    InputIconModule,
    InputTextModule,
    PaginatorModule,
    FormsModule,
    RoleFormComponent
  ],
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit, OnDestroy {
  roles: Role[] = [];
  search: string = '';
  first = 0;
  rows = 10;

  visibleForm: boolean = false;
  role: Role | null = null;

  pageList: PageList<Role> = {
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
    private service: RoleService,
    private messageService: MessageService,
    private cd: ChangeDetectorRef
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
    console.log('Loading roles with filter:', this.filterQuery);
    this.service
      .GetByFilter(this.filterQuery)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: PageList<Role>) => {
          this.pageList = resp;
          console.log('PageList:', this.pageList.elements);
        },
      });
  }

  onSearch(event: any) {
    this.searchSubject$.next(event.target.value);
  }

  registerRole(role: RoleCommand) {
    this.service.Create(role)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registered',
            detail: 'Role registered',
          });
          this.service.notifyRegistro(role);
          this.hideForm();
        }
      });
  }

  updateRole(role: Role) {
    this.service.Update(role.id!, role)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Role updated',
          });
          this.service.notifyRegistro(role);
          this.hideForm();
        }
      });
  }

  deleteRole(role: Role) {
    this.service.Delete(role.id!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Role deleted',
          });
          this.service.notifyRegistro(role);
        }
      });
  }

  showForm(role?: Role) {
    this.role = role ? { ...role } : null;
    this.visibleForm = true;
  }

  hideForm() {
    this.visibleForm = false;
    this.role = null;
  }

  onSortChange(event: { field: string, order: number }) {
    this.filterQuery.orderColumn = event.field;
    this.filterQuery.orderList = event.order === 1 ? 'asc' : 'desc';
    this.filterQuery.page = 1;
    this.loadWithFilter();
  }

  onPageChange(event: { first: number; rows: number; }) {
  const newPage = Math.floor(event.first / event.rows) + 1;
  // Solo actualiza si la página o el tamaño cambian realmente
  if (newPage === this.filterQuery.page && event.rows === this.filterQuery.sizePage) {
    return;
  }
  this.first = event.first;
  this.rows = event.rows;
  this.filterQuery.page = newPage;
  this.filterQuery.sizePage = event.rows;
  this.loadWithFilter();
}

}
