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
import { UserFormComponent } from '../user-form/user-form.component';
import { ChangeState, User, UserCommand } from '../../../../../core/models/user.model';
import { PageList } from '../../../../../core/models/PageList.model';
import { FilterQuery } from '../../../../../core/models/filterQuery.model';
import { UserService } from '../../../../../core/services/user.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-user-list',
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
    UserFormComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  search: string = '';
  first = 0;
  rows = 10;

  visibleForm: boolean = false;
  user: User | null = null;

  pageList: PageList<User> = {
    elements: [],
    page: 1,
    sizePage: 10,
    totalAmount: 0,
    hasNextPage: false,
    hasPreviousPage: false
  };

  filterQuery: FilterQuery = {
    searchTerm: '',
    orderColumn: 'userName',
    orderList: 'asc',
    page: 1,
    sizePage: 10
  };

  private searchSubject$ = new Subject<string>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private service: UserService,
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
        next: (resp: PageList<User>) => {
          this.pageList = resp;
          this.first = (resp.page - 1) * resp.sizePage;
          this.rows = resp.sizePage;
        },
      });
  }

  onSearch(event: any) {
    this.searchSubject$.next(event.target.value);
  }

  changeUserState(user: User) {
  // Alterna el estado entre 'Aceptado' y 'Pendiente'
  const newState = user.state === 'Aceptado' ? 'Pendiente' : 'Aceptado';
  const changeState: ChangeState = {
    id: user.id,
    state: newState
  };


  this.service.changeState(changeState).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Estado actualizado',
        detail: `El estado del usuario ha sido cambiado a ${newState}.`
      });
      this.loadWithFilter();
    }
  });
}

  registerUser(user: UserCommand) {
    this.service.Create(user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registrado',
            detail: 'Usuario registrado',
          });
          this.service.notifyRegistro(user);
          this.hideForm();
        }
      });
  }

  updateUser(user: User) {
    this.service.Update(user.id!, user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Usuario actualizado',
          });
          this.service.notifyRegistro(user);
          this.hideForm();
        }
      });
  }

  deleteUser(user: User) {
    this.service.Delete(user.id!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Usuario eliminado',
          });
          this.service.notifyRegistro(user);
        }
      });
  }

  showForm(user?: User) {
    this.user = user ? { ...user } : null;
    this.visibleForm = true;
  }

  hideForm() {
    this.visibleForm = false;
    this.user = null;
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
