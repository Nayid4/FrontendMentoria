import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AddProgramActivityToProgramCommand, ProgramActivityResponse } from '../../../../../../core/models/programActivity.model';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [
    Dialog, 
    ButtonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    CommonModule
  ],
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.css'
})
export class ActivityFormComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() programId: string = '';
  @Input() activity: ProgramActivityResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() register = new EventEmitter<AddProgramActivityToProgramCommand>();
  @Output() update = new EventEmitter<ProgramActivityResponse>();

  activityForm!: FormGroup;
  title = 'Registrar Actividad';
  actionType = 'Registrar';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    if (this.activity) this.prefillForm(this.activity);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activity']) {
      if (this.activity) {
        this.title = 'Editar Actividad';
        this.actionType = 'Actualizar';
        this.prefillForm(this.activity);
      } else {
        this.title = 'Registrar Actividad';
        this.actionType = 'Registrar';
        this.activityForm?.reset();
      }
    }
  }

  initForm() {
    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  prefillForm(act: ProgramActivityResponse) {
    this.activityForm.patchValue({
      name: act.name,
      description: act.description,
      startDate: act.startDate ? act.startDate.substring(0, 10) : '',
      endDate: act.endDate ? act.endDate.substring(0, 10) : '',
      state: act.state,
    });
  }

  onSubmit() {
    if (this.activityForm.invalid) {
      this.activityForm.markAllAsTouched();
      return;
    }

    if (this.activity) {
      // Actualizar
      const updated: ProgramActivityResponse = {
        ...this.activity,
        ...this.activityForm.value,
        startDate: this.activityForm.value.startDate,
        endDate: this.activityForm.value.endDate,
      };
      this.update.emit(updated);
    } else {
      // Registrar
      this.register.emit({
        idProgram: this.programId,
        ...this.activityForm.value
      });
    }
    this.closeDialog();
  }

  closeDialog() {
    this.close.emit();
    this.activityForm.reset();
  }

  isInvalidField(field: string) {
    const ctrl = this.activityForm.get(field);
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }
}
