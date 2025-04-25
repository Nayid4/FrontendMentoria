import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { LoginIn } from '../../../core/models/loginIn.model';

@Component({
  selector: 'app-login-in',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-in.component.html',
  styleUrl: './login-in.component.css'
})
export class LoginInComponent  implements OnInit {
  formulario!: FormGroup


  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private servicioAutenticacion: AuthService,
    private servicioMensaje: MessageService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  onSubmit(): void {
    if(this.formulario.valid){
      const datosFormulario: LoginIn = this.formulario.value as LoginIn;

      this.servicioAutenticacion.IniciarSesion(datosFormulario).subscribe({
        next: () => {

          this.router.navigate(['/dashboard'])
          this.servicioMensaje.add({ severity: 'success', summary: 'Exito', detail: 'Bienvenido' });
          
        }
      });

      
    }else{
      //this.servicioMensaje.add({ severity: 'error', summary: 'Error', detail: 'Completa los campos!' });
      this.markFieldsAsTouched(); // Marca todos los campos como tocados
      this.showErrorMessage();
      return;
    }
  }

  markFieldsAsTouched() {
    Object.keys(this.formulario.controls).forEach(field => {
        const control = this.formulario.get(field);
        if (control) {
            control.markAsTouched({ onlySelf: true });
        }
    });
  }

  showErrorMessage() {
      let message = 'Por favor, complete los siguientes campos: ';
      const invalidFields: string[] = [];
      
      Object.keys(this.formulario.controls).forEach(field => {
          const control = this.formulario.get(field);
          if (control && control.invalid) {
              invalidFields.push(field);
          }
      });

      if (invalidFields.length) {
          message += invalidFields.join(', ');
      }

      this.servicioMensaje.add({ severity: 'error', summary: 'Error', detail: message });
    }
}

