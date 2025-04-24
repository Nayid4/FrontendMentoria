import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UserSearchPipe } from '../../../../shared/pipes/user-search.pipe';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserCommand, User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';


@Component({
  selector: 'app-user-list',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    PaginatorModule,
    UserSearchPipe,
    FormsModule,
    UserFormComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit, OnDestroy {
  userList: User[] = [];
  busqueda: string = '';
  first = 0;
  rows = 10;
  registrar: string = '';

  visibleFormulario: boolean = false;
  user!: User | null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private serviciouser: UserService,
    private cdr: ChangeDetectorRef,
    private servicioMensaje: MessageService,
    private route: Router
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.serviciouser
      .GetAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: User[]) => {
          this.userList = resp;
        },
      });

    this.serviciouser.Updated$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (updateduser) => {
        if (updateduser) {
          this.serviciouser
            .GetAll()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: User[]) => {
              this.userList = resp;
            });
        }
      }
    );

    this.serviciouser.Registro$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (registrouser) => {
        if (registrouser) {
          this.serviciouser
            .GetAll()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: User[]) => {
              this.userList = resp;
            });
        }
      }
    );
  }

  UserCreate(user: UserCommand) {
    this.serviciouser
      .Create(user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.servicioMensaje.add({
            severity: 'success',
            summary: 'Registrado',
            detail: 'Usuario Registrado',
          });

          this.serviciouser.notifyRegistro(user);
          this.ocultarFormulario();
        },
      });
  }

  UserUpdate(user: User) {
    this.serviciouser
      .Update(user.id, user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.servicioMensaje.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Usuario Actualizado',
          });

          this.serviciouser.notifyUpdate(user);

          this.ocultarFormulario();
        },
      });
  }

  UserDelete(user: User) {
    this.serviciouser
      .Delete(user.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.servicioMensaje.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Usuario Eliminado',
          });

          this.serviciouser.notifyUpdate(user);
        },
      });
  }

  mostrarFormulario(user?: User) {
    if (user) {
      this.user = { ...user };
    }

    console.log(this.user);

    this.visibleFormulario = !this.visibleFormulario;
  }

  ocultarFormulario() {
    this.visibleFormulario = false;
    this.user = null;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.userList
      ? this.first === this.userList.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.userList ? this.first === 0 : true;
  }
}
