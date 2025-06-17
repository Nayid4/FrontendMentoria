import { Routes } from "@angular/router";
import { ManageProgramLayoutComponent } from "./manage-program-layout/manage-program-layout.component";
import { ProgramListComponent } from "./program-list/program-list.component";
import { ActivityListComponent } from "./manageActivity/activity-list/activity-list.component";
import { UserProgramListComponent } from "./manageUserProgram/user-program-list/user-program-list.component";
import { ActivitySolutionListComponent } from "./manageActivity/manageSolution/activity-solution-list/activity-solution-list.component";

export const MANAGE_PROGRAM_ROUTES: Routes = [
  {
    path: '',
    component: ManageProgramLayoutComponent,
    children: [
      { path: '', component: ProgramListComponent },
      { path: ':id/actividades', component: ActivityListComponent },
      {
        path: ':id/actividades/:idActividad/soluciones',
        component: ActivitySolutionListComponent,
      },
      { path: ':id/usuarios', component: UserProgramListComponent },
    ],
  },
];