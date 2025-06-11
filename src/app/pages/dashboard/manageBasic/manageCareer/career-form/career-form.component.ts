import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Career, CareerCommand } from '../../../../../core/models/career.model';

@Component({
  selector: 'app-career-form',
  standalone: true,
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.css']
})
export class CareerFormComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() career: Career | null = null;

  @Output() close = new EventEmitter<boolean>();
  @Output() register = new EventEmitter<CareerCommand>();
  @Output() update = new EventEmitter<Career>();

  careerForm!: FormGroup;
  title: string = 'Register Career';
  actionType: string = 'Register';

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['career'] && changes['career'].currentValue) {
      this.title = 'Edit Career';
      this.actionType = 'Edit';
      this.prefillForm(this.career!);
    } else {
      this.title = 'Register Career';
      this.actionType = 'Register';
    }
  }

  ngOnInit(): void {
    this.initForm();
    if (this.career) {
      this.title = 'Edit Career';
      this.actionType = 'Edit';
      this.prefillForm(this.career);
    }
  }

  initForm() {
    this.careerForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
    });
  }

  prefillForm(career?: Career) {
    this.careerForm.patchValue({
      id: career?.id ?? '',
      name: career?.name ?? '',
    });
  }

  onSubmit() {
    if (this.careerForm.invalid) {
      this.careerForm.markAllAsTouched();
      return;
    }
    if (this.career) {
      const updatedCareer: Career = {
        id: this.career.id,
        name: this.careerForm.value.name,
      };
      this.update.emit(updatedCareer);
    } else {
      const careerCommand: CareerCommand = {
        name: this.careerForm.value.name,
      };
      this.register.emit(careerCommand);
    }
  }

  closeDialog() {
    this.close.emit(false);
    this.careerForm.reset();
  }

  isInvalidField(field: string): boolean {
    const ctrl = this.careerForm.get(field);
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }
}
