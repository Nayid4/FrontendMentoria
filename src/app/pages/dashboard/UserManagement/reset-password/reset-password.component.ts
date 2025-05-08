import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangePassword, User } from '../../../../core/models/user.model';
import { DataUser } from '../../../../core/models/dataUser.model';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { MessageService } from 'primeng/api';
import { TitleFormComponent } from '../../../../shared/components/title-form/title-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TitleFormComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  formulario!: FormGroup;
  user!: DataUser;

  title: string = 'Cambiar contraseña';

  constructor(
    private authService: AuthService,
    private servicioFormulario: FormularioUtilService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();

    this.authService.dataAuthenticated$.subscribe({
      next: (resp) => {
        this.user = resp;
      },
    });
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      id: [''],
      password: ['', Validators.required],
      passwordVerify: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formulario.invalid) {
      this.servicioFormulario.verificarFormulario(this.formulario);
      return;
    }

    const formValue = this.formulario.value;

    const changePassword: ChangePassword = {
      id: this.user.id,
      password: formValue.password,
      passwordVerify: formValue.passwordVerify,
    };

    this.authService.ForgetPassword(changePassword).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Contraseña cambiada correctamente',
          detail: 'La contraseña ha sido cambiada correctamente',
        });

        this.formulario.reset();
      },
    });
  }

  campoInvalido(nombreCampo: string): boolean {
    return this.servicioFormulario.campoInvalido(this.formulario, nombreCampo);
  }
}
