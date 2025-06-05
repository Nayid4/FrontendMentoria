import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCommand } from '../../../../core/models/user.model';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { StepperModule } from 'primeng/stepper';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TabView, TabViewModule } from 'primeng/tabview';
import { RoleService } from '../../../../core/services/role.service';
import { CareerService } from '../../../../core/services/career.service';
import { RolInscriptionComponent } from "../rol-inscription/rol-inscription.component";
import { PersonalInformationComponent } from "../personal-information/personal-information.component";
import { AcademicInformationComponent } from "../academic-information/academic-information.component";
import { ResumeInformationComponent } from "../resume-information/resume-information.component";
import { ResultComponent } from '../result/result.component';
import { UserService } from '../../../../core/services/user.service';
import { MessageService } from 'primeng/api';
import { Role } from '../../../../core/models/role.model';
import { PersonalInformation } from '../../../../core/models/personalInformation.model';
import { AcademicInformation } from '../../../../core/models/academicInformation.model';

@Component({
  selector: 'app-register-user-index',
  imports: [
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StepperModule,
    ButtonModule,
    RolInscriptionComponent,
    PersonalInformationComponent,
    AcademicInformationComponent,
    ResumeInformationComponent,
    ResultComponent,
  ],
  templateUrl: './register-user-index.component.html',
  styleUrl: './register-user-index.component.css',
})
export class RegisterUserIndexComponent implements OnInit {
  formularioUsuario!: FormGroup;

  stepHeadList: { id: number; name: string; component: any }[] = [
    { id: 1, name: 'Rol', component: RolInscriptionComponent },
    { id: 2, name: 'Información Personal', component: PersonalInformationComponent },
    { id: 3, name: 'Información Académica', component: AcademicInformationComponent },
    { id: 4, name: 'Resumen', component: ResumeInformationComponent },
    { id: 5, name: 'Resultado', component: ResultComponent },
  ];


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
    const personalInformationForm = this.formularioUsuario.get(
      'personalInformation'
    );

    if (personalInformationForm?.valid) {
      activateCallback(3);
    } else {
      if (personalInformationForm instanceof FormGroup) {
        this.servicioFormulario.verificarFormulario(personalInformationForm);
      }
    }
  }

  irAlPaso4(activateCallback: (index: number) => void) {
    const academicInformationForm = this.formularioUsuario.get(
      'academicInformation'
    );

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

    const nuevoUsuario: UserCommand = {
      role: {
        id: formValue.role.id.id,
        name: formValue.role.id.id.name,
      } ,
      personalInformation: formValue.personalInformation as PersonalInformation,
      academicInformation: {
        code: formValue.academicInformation.code,
        career: {
          id: formValue.academicInformation.career.id.id,
          name: formValue.academicInformation.career.id.id.name,
        },
        cicle: formValue.academicInformation.cicle,
        email: formValue.academicInformation.email,
        expectative: formValue.academicInformation.expectative
      },
    };

    console.log(nuevoUsuario);

    this.userService.Create(nuevoUsuario).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario creado',
          detail: 'El usuario ha sido creado correctamente',
        });

        activateCallback(5);
      }
    });

  }

  onSubmit() {
    if (this.formularioUsuario.invalid) {
      this.servicioFormulario.verificarFormulario(this.formularioUsuario);
      return;
    }

    const formValue = this.formularioUsuario.value;

    const nuevoUsuario: UserCommand = {
      role: formValue.role,
      personalInformation: formValue.personalInformation,
      academicInformation: formValue.academicInformation,
    };

    console.log(nuevoUsuario);
  }
}
