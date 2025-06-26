import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../../../../core/models/user.model';
import { MentorAssignmentCreateCommand, MentorAssignmentResponse } from '../../../../core/models/mentorAssignment.model';

@Component({
  selector: 'app-mentor-assignment-form',
  standalone: true,
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './mentor-assignment-form.component.html',
  styleUrls: ['./mentor-assignment-form.component.css']
})
export class MentorAssignmentFormComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() mentors: User[] = [];
  @Input() ingresantes: User[] = [];
  @Input() assignment: MentorAssignmentResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() register = new EventEmitter<MentorAssignmentCreateCommand>();
  @Output() update = new EventEmitter<MentorAssignmentCreateCommand>();

  assignmentForm!: FormGroup;
  title: string = 'Registrar Asignación';
  actionType: string = 'Registrar';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    if (this.assignment) {
      this.title = 'Editar Asignación';
      this.actionType = 'Editar';
      this.prefillForm(this.assignment);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assignment'] && changes['assignment'].currentValue) {
      this.title = 'Editar Asignación';
      this.actionType = 'Editar';
      this.prefillForm(this.assignment!);
    } else {
      this.title = 'Registrar Asignación';
      this.actionType = 'Registrar';
      this.assignmentForm?.reset();
    }
  }

  initForm() {
    this.assignmentForm = this.fb.group({
      idMentor: ['', Validators.required],
      idUser: ['', Validators.required]
    });
  }

  prefillForm(assignment: MentorAssignmentResponse) {
    this.assignmentForm.patchValue({
      idMentor: assignment.mentor.id,
      idUser: assignment.user.id,
    });
  }

  onSubmit() {
    if (this.assignmentForm.invalid) {
      this.assignmentForm.markAllAsTouched();
      return;
    }
    const command: MentorAssignmentCreateCommand = {
      idMentor: this.assignmentForm.value.idMentor,
      idUser: this.assignmentForm.value.idUser
    };
    if (this.assignment) {
      // Para edición
      this.update.emit({ ...command, id: this.assignment.id } as any);
    } else {
      // Para registro
      this.register.emit(command);
    }
    this.closeDialog();
  }

  closeDialog() {
    this.close.emit();
    this.assignmentForm.reset();
  }

  isInvalidField(field: string): boolean {
    const ctrl = this.assignmentForm.get(field);
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }
}
