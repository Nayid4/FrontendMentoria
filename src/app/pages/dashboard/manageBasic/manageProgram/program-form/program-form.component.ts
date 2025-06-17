import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgramResponse, ProgramCommand } from '../../../../../core/models/program.model';
import { Career } from '../../../../../core/models/career.model';

@Component({
  selector: 'app-program-form',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css']
})
export class ProgramFormComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() program: ProgramResponse | null = null;
  @Input() careers: Career[] = [];

  @Output() close = new EventEmitter<boolean>();
  @Output() register = new EventEmitter<ProgramCommand>();
  @Output() update = new EventEmitter<ProgramResponse>();

  programForm!: FormGroup;
  title: string = 'Register Program';
  actionType: string = 'Register';

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['program'] && changes['program'].currentValue) {
      this.title = 'Edit Program';
      this.actionType = 'Edit';
      this.prefillForm(this.program!);
    } else {
      this.title = 'Register Program';
      this.actionType = 'Register';
    }
  }

  ngOnInit(): void {
    this.initForm();
    if (this.program) {
      this.title = 'Edit Program';
      this.actionType = 'Edit';
      this.prefillForm(this.program);
    }
  }

  initForm() {
    this.programForm = this.fb.group({
      id: [''],
      idCareer: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      maximumNumberOfParticipants: [1, [Validators.required, Validators.min(1)]],
    });
  }

  prefillForm(program?: ProgramResponse) {
    this.programForm.patchValue({
      id: program?.id ?? '',
      idCareer: program?.career?.id ?? '',
      name: program?.name ?? '',
      type: program?.type ?? '',
      description: program?.description ?? '',
      maximumNumberOfParticipants: program?.maximumNumberOfParticipants ?? 1,
    });
  }

  onSubmit() {
    if (this.programForm.invalid) {
      this.programForm.markAllAsTouched();
      return;
    }
    if (this.program) {
      const updatedProgram: ProgramResponse = {
        ...this.program,
        ...this.programForm.value,
        career: this.careers.find(c => c.id === this.programForm.value.idCareer)!,
      };
      this.update.emit(updatedProgram);
    } else {
      const programCommand: ProgramCommand = {
        ...this.programForm.value
      };
      this.register.emit(programCommand);
    }

    this.closeDialog();
  }

  closeDialog() {
    this.close.emit(false);
    this.programForm.reset();
  }

  isInvalidField(field: string): boolean {
    const ctrl = this.programForm.get(field);
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }
}
