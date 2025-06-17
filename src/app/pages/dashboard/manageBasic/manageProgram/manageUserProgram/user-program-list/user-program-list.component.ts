import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UserProgramFormComponent } from '../user-program-form/user-program-form.component';
import { DialogModule } from 'primeng/dialog';
import { ProgramUserService } from '../../../../../../core/services/program-user.service';
import { AddUserToProgramCommand, ProgramUserResponse } from '../../../../../../core/models/programUser.model';
import { User } from '../../../../../../core/models/user.model';
import { UserService } from '../../../../../../core/services/user.service';

@Component({
  selector: 'app-user-program-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    UserProgramFormComponent
  ],
  templateUrl: './user-program-list.component.html',
  styleUrl: './user-program-list.component.css'
})
export class UserProgramListComponent implements OnInit, OnDestroy {
  users: ProgramUserResponse[] = [];
  search: string = '';
  programId: string = '';
  visibleForm: boolean = false;

  usersNoAgregados: User[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private programUserService: ProgramUserService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.programId = params.get('id')!;
      this.loadUsers();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadUsers() {
    this.programUserService.getUsersByProgram(this.programId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp) => {
          this.users = resp;
          console.log('Usuarios del programa:', this.users);
        }
      });
  }

  loadUsuariosNoAgregados() {
    // Carga todos los usuarios y filtra los que no están ya en el programa
    this.userService.GetAll().subscribe(users => {
      const idsYaAgregados = this.users.map(u => u.personalInformation.id);
      this.usersNoAgregados = users.filter(u => !idsYaAgregados.includes(u.id));
    });
  }

  showForm() {
    this.loadUsuariosNoAgregados();
    this.visibleForm = true;
  }

  onAddUserToProgram(command: AddUserToProgramCommand) {

    console.log('Agregando usuario al programa:', command);

    this.programUserService.addUserToProgram(command).subscribe({
      next: () => {
        this.loadUsers();
        this.hideForm();
        this.messageService.add({
          severity: 'success',
          summary: 'Agregado',
          detail: 'Usuario agregado al programa'
        });
      }
    });
  }


  hideForm() {
    this.visibleForm = false;
  }

  onUserAdded() {
    this.loadUsers();
    this.hideForm();
  }

  deleteUser(user: ProgramUserResponse) {
    const idUser = user.personalInformation.id;
    this.programUserService.deleteUserFromProgram({
      idProgram: this.programId,
      idUser: idUser
    }).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Usuario removido del programa'
        });
        this.loadUsers();
      }
    });
  }

  getFullName(user: ProgramUserResponse): string {
    return `${user.personalInformation.name} ${user.personalInformation.lastName}`;
  }

  // Puedes implementar filtrado local si lo deseas
  get filteredUsers(): ProgramUserResponse[] {
    if (!this.search) return this.users;
    const lower = this.search.toLowerCase();
    return this.users.filter(u =>
      u.userName.toLowerCase().includes(lower) ||
      this.getFullName(u).toLowerCase().includes(lower) ||
      u.role.name.toLowerCase().includes(lower)
    );
  }
}
