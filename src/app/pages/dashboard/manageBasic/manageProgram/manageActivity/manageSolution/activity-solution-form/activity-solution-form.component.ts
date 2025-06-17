import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AddSolutionToProgramActivityCommand } from '../../../../../../../core/models/programActivitySolution.model';
import { User } from '../../../../../../../core/models/user.model';
import { FileService } from '../../../../../../../core/services/file.service';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-activity-solution-form',
  standalone: true,
  imports: [
    Dialog,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FileUploadModule
  ],
  templateUrl: './activity-solution-form.component.html',
  styleUrl: './activity-solution-form.component.css'
})
export class ActivitySolutionFormComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() programActivityId: string = '';
  @Input() users: User[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() register = new EventEmitter<AddSolutionToProgramActivityCommand>();

  form!: FormGroup;
  fileId: string | null = null;
  fileName: string | null = null;
  uploading = false;

  constructor(private fb: FormBuilder, private fileService: FileService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idUser: ['', Validators.required],
      file: ['', Validators.required] // almacenamos el id de archivo
    });
  }

  onFileUpload(event: any) {
    const file: File = event.files?.[0];
    if (!file) return;
    this.uploading = true;
    this.fileName = file.name;

    this.fileService.upload(file).subscribe({
      next: (resp) => {
        this.fileId = resp.id;
        this.form.patchValue({ file: this.fileId });
        this.uploading = false;
      },
      error: () => {
        this.uploading = false;
        // puedes mostrar un mensaje de error aquí si deseas
      }
    });
  }

  onSubmit() {
    if (this.form.invalid || !this.fileId) {
      this.form.markAllAsTouched();
      return;
    }
    const command: AddSolutionToProgramActivityCommand = {
      idProgramActivity: this.programActivityId,
      idUser: this.form.value.idUser,
      idFileSolution: this.fileId
    };
    this.register.emit(command);
    this.closeDialog();
  }

  closeDialog() {
    this.close.emit();
    this.form.reset();
    this.fileId = null;
    this.fileName = null;
    this.uploading = false;
  }

  isInvalidField(field: string) {
    const ctrl = this.form.get(field);
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }
}
