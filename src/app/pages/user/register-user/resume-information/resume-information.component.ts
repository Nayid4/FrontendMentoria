import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Role } from '../../../../core/models/role.model';
import { Career } from '../../../../core/models/career.model';
import { CareerService } from '../../../../core/services/career.service';
import { RoleService } from '../../../../core/services/role.service';
import { TitleFormComponent } from "../../../../shared/components/title-form/title-form.component";

@Component({
  selector: 'app-resume-information',
  imports: [TitleFormComponent],
  templateUrl: './resume-information.component.html',
  styleUrl: './resume-information.component.css'
})
export class ResumeInformationComponent implements OnInit{
  @Input() inscripcionForm!: FormGroup | any;

  roleList!: WritableSignal<Role[]>;
  careerList!: WritableSignal<Career[]>;
  title: string = 'Resumen de la Inscripción';

  constructor(
      private careerService: CareerService,
      private roleService: RoleService,
  ){}
  ngOnInit(): void {
    this.roleList = this.roleService.role;
    this.careerList = this.careerService.career;

    console.log(this.inscripcionForm.value);
  }

  getRoleName(roleId: string): string {
    const roles = this.roleList(); 
    const role = roles.find((role: Role) => role.id === roleId);
    return role?.name ?? '';
  }

  getCareerName(careerId: string): string {
    const careers = this.careerList(); 
    const career = careers.find((career) => career.id === careerId);
    return career?.name ?? '';
  }
  
}
