import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { StepperModule } from 'primeng/stepper';
import { RolInscriptionComponent } from '../../../../user/register-user/rol-inscription/rol-inscription.component';
import { PersonalInformationComponent } from '../../../../user/register-user/personal-information/personal-information.component';
import { AcademicInformationComponent } from '../../../../user/register-user/academic-information/academic-information.component';
import { ResumeInformationComponent } from '../../../../user/register-user/resume-information/resume-information.component';
import { ResultComponent } from '../../../../user/register-user/result/result.component';
import { RoleService } from '../../../../../core/services/role.service';
import { CareerService } from '../../../../../core/services/career.service';
import { UserService } from '../../../../../core/services/user.service';
import { FormularioUtilService } from '../../../../../core/services/formulario-util.service';
import { MessageService } from 'primeng/api';
import { User, UserCommand } from '../../../../../core/models/user.model';
import { PersonalInformation } from '../../../../../core/models/personalInformation.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TabViewModule,
    StepperModule,
    RolInscriptionComponent,
    PersonalInformationComponent,
    AcademicInformationComponent,
    ResumeInformationComponent,
    ResultComponent,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() user: User | null = null;

  @Output() close = new EventEmitter<boolean>();
  @Output() register = new EventEmitter<UserCommand>();
  @Output() update = new EventEmitter<User>();

  formularioUsuario!: FormGroup;

  stepHeadList: { id: number; name: string; component: any }[] = [
    { id: 1, name: 'Rol', component: RolInscriptionComponent },
    { id: 2, name: 'Información Personal', component: PersonalInformationComponent },
    { id: 3, name: 'Información Académica', component: AcademicInformationComponent },
    { id: 4, name: 'Resumen', component: ResumeInformationComponent },
    { id: 5, name: 'Resultado', component: ResultComponent },
  ];

  title: string = 'Registrar usuario';
  actionType: string = 'register';

  constructor(
    private roleService: RoleService,
    private careerService: CareerService,
    private userService: UserService,
    private servicioFormulario: FormularioUtilService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.loadCareer();
    this.loadRole();
    this.setFormValuesIfEdit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si cambia el input user (cuando abres modal para editar), setea valores en el form
    if (changes['user'] && this.formularioUsuario) {
      this.setFormValuesIfEdit();
    }
  }

  loadCareer() {
    this.careerService.GetAll().subscribe({
      next: (career) => {
        this.careerService.setCareer(career);
      },
    });
  }

  loadRole() {
    this.roleService.GetAll().subscribe({
      next: (role) => {
        this.roleService.setRole(role);
      },
    });
  }

  inicializarFormulario() {
    this.formularioUsuario = this.fb.group({
      role: this.fb.group({
        id: ['', Validators.required],
        name: [''],
      }),
      personalInformation: this.fb.group({
        dni: ['', Validators.required],
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        sex: ['', Validators.required],
        phone: ['', Validators.required],
      }),
      academicInformation: this.fb.group({
        code: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        career: this.fb.group({
          id: ['', Validators.required],
          name: [''],
        }),
        cicle: [1, Validators.required],
        expectative: ['', Validators.required],
      }),
    });
  }

  setFormValuesIfEdit() {
    if (this.user) {
      // Cambia a modo edición
      this.title = 'Actualizar usuario';
      this.actionType = 'update';
      this.formularioUsuario.patchValue({
        role: {
          id: this.user.role?.id || '',
          name: this.user.role?.name || '',
        },
        personalInformation: {
          dni: this.user.personalInformation?.dni || '',
          name: this.user.personalInformation?.name || '',
          lastName: this.user.personalInformation?.lastName || '',
          sex: this.user.personalInformation?.sex || '',
          phone: this.user.personalInformation?.phone || '',
        },
        academicInformation: {
          code: this.user.academicInformation?.code || '',
          email: this.user.academicInformation?.email || '',
          cicle: this.user.academicInformation?.cicle || 1,
          expectative: this.user.academicInformation?.expectative || '',
          career: {
            id: this.user.academicInformation?.career?.id || '',
            name: this.user.academicInformation?.career?.name || '',
          },
        },
      });
    } else {
      // Registro
      this.title = 'Registrar usuario';
      this.actionType = 'register';
      this.formularioUsuario?.reset();
    }
  }

  irAlPaso2(activateCallback: (index: number) => void) {
    const rolForm = this.formularioUsuario.get('role');
    if (rolForm?.valid) {
      activateCallback(2);
    } else {
      if (rolForm instanceof FormGroup) {
        this.servicioFormulario.verificarFormulario(rolForm);
      }
    }
  }

  irAlPaso3(activateCallback: (index: number) => void) {
    const personalInformationForm = this.formularioUsuario.get('personalInformation');
    if (personalInformationForm?.valid) {
      activateCallback(3);
    } else {
      if (personalInformationForm instanceof FormGroup) {
        this.servicioFormulario.verificarFormulario(personalInformationForm);
      }
    }
  }

  irAlPaso4(activateCallback: (index: number) => void) {
    const academicInformationForm = this.formularioUsuario.get('academicInformation');
    if (academicInformationForm?.valid) {
      activateCallback(4);
    } else {
      if (academicInformationForm instanceof FormGroup) {
        this.servicioFormulario.verificarFormulario(academicInformationForm);
      }
    }
  }

  irAlpaso5(activateCallback: (index: number) => void) {
    if (this.formularioUsuario.invalid) {
      this.servicioFormulario.verificarFormulario(this.formularioUsuario);
      return;
    }

    const formValue = this.formularioUsuario.value;
    // Si es registro
    if (!this.user) {
      const nuevoUsuario: UserCommand = {
        role: {
          id: formValue.role.id,
          name: formValue.role.name,
        },
        personalInformation: formValue.personalInformation as PersonalInformation,
        academicInformation: {
          code: formValue.academicInformation.code,
          career: {
            id: formValue.academicInformation.career.id,
            name: formValue.academicInformation.career.name,
          },
          cicle: formValue.academicInformation.cicle,
          email: formValue.academicInformation.email,
          expectative: formValue.academicInformation.expectative,
        },
      };
      this.register.emit(nuevoUsuario);
      activateCallback(5);
    } else {
      // Es edición
      const userEdit: User = {
        ...this.user,
        role: {
          id: formValue.role.id,
          name: formValue.role.name,
        },
        personalInformation: { ...formValue.personalInformation },
        academicInformation: {
          ...formValue.academicInformation,
          career: {
            id: formValue.academicInformation.career.id,
            name: formValue.academicInformation.career.name,
          },
        },
      };
      this.update.emit(userEdit);
      activateCallback(5);
    }
  }

  closeDialog() {
    this.close.emit(true);
    this.formularioUsuario?.reset();
  }
}
