import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CareerService } from '../../../../core/services/career.service';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { TitleFormComponent } from '../../../../shared/components/title-form/title-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-information',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TitleFormComponent
  ],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
})
export class PersonalInformationComponent {
  @Input() personalForm!: FormGroup | any;

  title: string = 'Información Personal';

  constructor(
    private formService: FormularioUtilService
  ) {}

  campoInvalido(nombreCampo: string): boolean {
    return this.formService.campoInvalido(this.personalForm, nombreCampo);
  }

  permitirSoloNumeros(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    // Permite solo números (0–9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  permitirSoloLetras(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode || event.which);
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

    if (!regex.test(char)) {
      event.preventDefault();
    }
  }

  limitarLongitud(event: Event, maxLength: number): void {
  const input = event.target as HTMLInputElement;
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
    // Actualiza el formControl si lo estás usando con ReactiveForms
    const controlName = input.getAttribute('formControlName');
    if (controlName) {
      this.personalForm.get(controlName)?.setValue(input.value);
    }
  }
}

}
