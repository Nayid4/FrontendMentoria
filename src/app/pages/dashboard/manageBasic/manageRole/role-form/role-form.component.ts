import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Role, RoleCommand } from '../../../../../core/models/role.model';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() role: Role | null = null;

  @Output() close = new EventEmitter<boolean>();
  @Output() register = new EventEmitter<RoleCommand>();
  @Output() update = new EventEmitter<Role>();

  roleForm!: FormGroup;
  title: string = 'Register Role';
  actionType: string = 'Register';

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['role'] && changes['role'].currentValue) {
      this.title = 'Edit Role';
      this.actionType = 'Edit';
      this.prefillForm(this.role!);
    } else {
      this.title = 'Register Role';
      this.actionType = 'Register';
    }
  }

  ngOnInit(): void {
    this.initForm();
    if (this.role) {
      this.title = 'Edit Role';
      this.actionType = 'Edit';
      this.prefillForm(this.role);
    }
  }

  initForm() {
    this.roleForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
    });
  }

  prefillForm(role?: Role) {
    this.roleForm.patchValue({
      id: role?.id ?? '',
      name: role?.name ?? '',
    });
  }

  onSubmit() {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }
    if (this.role) {
      const updatedRole: Role = {
        id: this.role.id,
        name: this.roleForm.value.name,
      };
      this.update.emit(updatedRole);
    } else {
      const roleCommand: RoleCommand = {
        name: this.roleForm.value.name,
      };
      this.register.emit(roleCommand);
    }
  }

  closeDialog() {
    this.close.emit(false);
    this.roleForm.reset();
  }

  isInvalidField(field: string): boolean {
    const ctrl = this.roleForm.get(field);
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }
}
