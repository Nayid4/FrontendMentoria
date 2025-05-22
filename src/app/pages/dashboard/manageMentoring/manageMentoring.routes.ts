import { Routes } from "@angular/router";
import { ManageMentoringLayoutComponent } from "./manage-mentoring-layout/manage-mentoring-layout.component";
import { AssignmentComponent } from "./assignment/assignment.component";
import { RegisterWorkshopComponent } from "../manageActivity/register-workshop/register-workshop.component";
import { PreposalsComponent } from "./preposals/preposals.component";
import { RegsiterReportComponent } from "./regsiter-report/regsiter-report.component";

export const MANAGE_MENTORING_ROUTES: Routes = [
    {
        path: '',
        component: ManageMentoringLayoutComponent,
        children: [
            {
                path: 'asignacion',
                component: AssignmentComponent
            },
            {
                path: 'registrar-informe',
                component: RegsiterReportComponent
            },
            {
                path: 'propuestas',
                component: PreposalsComponent
            }
        ]
    }
]