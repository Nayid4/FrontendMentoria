import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserCommand, User } from '../../../../core/models/user.model';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-user-form',
  imports: [
    StepperModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() usuario!: User | null;

  @Output() cerrar = new EventEmitter<boolean>();
  @Output() registrar = new EventEmitter<UserCommand>();
  @Output() actualizar = new EventEmitter<User>();

  formularioUsuario!: FormGroup;
  titulo: string = 'Registrar Usuario';
  tipo: string = 'Registrar';

  activeStep: number = 1;

  constructor(
    private servicioFormulario: FormularioUtilService,
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario'] && changes['usuario'].currentValue) {
      this.titulo = 'Editar Usuario';
      this.tipo = 'Editar';
      this.precargarFormulario(this.usuario!);
    } else {
      this.titulo = 'Registrar Usuario';
      this.tipo = 'Registrar';
    }
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    if (this.usuario) {
      this.titulo = 'Editar Usuario';
      this.tipo = 'Editar';
      this.precargarFormulario(this.usuario);
    }
  }

  inicializarFormulario() {
    this.formularioUsuario = this.fb.group({
      id: [''],
      userName: ['', Validators.required],
      role: this.fb.group({
        id: [''],
        name: ['', Validators.required],
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
          id: [''],
          name: ['', Validators.required],
        }),
        cicle: [1, Validators.required],
        expectative: ['', Validators.required],
      }),
    });
  }

  precargarFormulario(usuario: User) {
    this.formularioUsuario.patchValue({
      id: usuario.id,
      userName: usuario.userName,
      role: {
        id: usuario.role?.id ?? '',
        name: usuario.role?.name ?? '',
      },
      personalInformation: {
        dni: usuario.personalInformation.dni,
        name: usuario.personalInformation.name,
        lastName: usuario.personalInformation.lastName,
        sex: usuario.personalInformation.sex,
        phone: usuario.personalInformation.phone,
      },
      academicInformation: {
        code: usuario.academicInformation.code,
        email: usuario.academicInformation.email,
        career: {
          id: usuario.academicInformation.career?.id ?? '',
          name: usuario.academicInformation.career?.name ?? '',
        },
        cicle: usuario.academicInformation.cicle,
        expectative: usuario.academicInformation.expectative,
      },
    });
  }

  onSubmit() {
    if (this.formularioUsuario.invalid) {
      this.servicioFormulario.verificarFormulario(this.formularioUsuario);
      return;
    }

    const formValue = this.formularioUsuario.value;

    if (this.usuario) {
      const usuarioActualizado: User = {
        id: formValue.id,
        userName: formValue.userName,
        role: formValue.role,
        personalInformation: formValue.personalInformation,
        academicInformation: formValue.academicInformation,
        state: this.usuario.state
      };
      this.actualizar.emit(usuarioActualizado);
    } else {
      const nuevoUsuario: UserCommand = {
        role: formValue.role,
        personalInformation: formValue.personalInformation,
        academicInformation: formValue.academicInformation,
      };
      this.registrar.emit(nuevoUsuario);
    }
  }

  cerrarDialog() {
    this.cerrar.emit(false);
    this.formularioUsuario.reset();
  }

  campoInvalido(nombreCampo: string): boolean {
    return this.servicioFormulario.campoInvalido(
      this.formularioUsuario,
      nombreCampo
    );
  }
}

