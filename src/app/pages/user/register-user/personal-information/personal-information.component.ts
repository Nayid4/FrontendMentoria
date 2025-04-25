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
}
