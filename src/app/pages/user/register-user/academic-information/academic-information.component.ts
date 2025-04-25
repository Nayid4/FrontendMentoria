import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Career } from '../../../../core/models/career.model';
import { CareerService } from '../../../../core/services/career.service';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { TitleFormComponent } from '../../../../shared/components/title-form/title-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-academic-information',
  imports: [
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TitleFormComponent
  ],
  templateUrl: './academic-information.component.html',
  styleUrl: './academic-information.component.css'
})
export class AcademicInformationComponent implements OnInit {
  @Input() AcademicForm!: FormGroup | any;
  @Input() CareerForm!: FormGroup | any;

  title: string = 'Información Academica';

  careerList!: WritableSignal<Career[]>;

  constructor(
    private careerService: CareerService,
    private formService: FormularioUtilService
  ){}
  
  ngOnInit(): void {
    this.careerList = this.careerService.career;
  }

  campoInvalido(nombreCampo: string): boolean {
    return this.formService.campoInvalido(this.AcademicForm, nombreCampo);
  }

}
