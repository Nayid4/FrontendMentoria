import { ChangeDetectorRef, Component, Input, OnInit, WritableSignal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from '../../../../core/services/role.service';
import { Role } from '../../../../core/models/role.model';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { CommonModule } from '@angular/common';
import { TitleFormComponent } from "../../../../shared/components/title-form/title-form.component";
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-rol-inscription',
  imports: [
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TitleFormComponent
],
  templateUrl: './rol-inscription.component.html',
  styleUrl: './rol-inscription.component.css',
})
export class RolInscriptionComponent implements OnInit {
  @Input() roleForm!: FormGroup | any;

  roleList!: WritableSignal<Role[]>;
  title: string = 'Seleccionar Rol';

  constructor(
    private roleService: RoleService,
    private formService: FormularioUtilService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.roleList = this.roleService.role;
  }

  campoInvalido(nombreCampo: string): boolean {
    return this.formService.campoInvalido(
      this.roleForm,
      nombreCampo
    );
  }
}
