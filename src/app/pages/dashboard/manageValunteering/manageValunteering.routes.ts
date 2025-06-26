import { Routes } from "@angular/router";
import { ManageVolunteeringLayoutComponent } from "./manage-volunteering-layout/manage-volunteering-layout.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { ProgramValunteeringListComponent } from "./program-valunteering-list/program-valunteering-list.component";

export const MANAGE_VALUNTEERING_ROUTES: Routes = [
    {
        path: '',
        component: ManageVolunteeringLayoutComponent,
        children: [
            {
                path: '',
                component: ProgramValunteeringListComponent
            },
            {
                path: 'asistencia',
                component: AttendanceComponent
            }
        ]
    }
];