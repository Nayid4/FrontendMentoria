import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../../../core/models/user.model';
import { AddUserToProgramCommand } from '../../../../../../core/models/programUser.model';

@Component({
  selector: 'app-user-program-form',
  standalone: true,
  imports: [
    Dialog,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './user-program-form.component.html',
  styleUrl: './user-program-form.component.css'
})
export class UserProgramFormComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() programId: string = '';
  @Input() users: User[] = [];
  @Output() close = new EventEmitter<boolean>();
  @Output() add = new EventEmitter<AddUserToProgramCommand>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reset el form cada vez que se muestra o cambia la lista de usuarios
    if (changes['visible'] || changes['users']) {
      this.form.reset();
    }
  }

  initForm() {
    this.form = this.fb.group({
      idUser: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Aquí está el valor correcto del usuario seleccionado:
    const command: AddUserToProgramCommand = {
      idProgram: this.programId,
      idUser: this.form.value.idUser, // Aquí ahora sí va el string del usuario
    };
    this.add.emit(command);
    this.closeDialog();
  }


  closeDialog() {
    this.close.emit(false);
    this.form.reset();
  }

  isInvalidField(field: string) {
    const ctrl = this.form.get(field);
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }
}
