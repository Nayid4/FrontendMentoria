import { Routes } from "@angular/router";
import { ManageWorkshopLayoutComponent } from "./manage-workshop-layout/manage-workshop-layout.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { ProgramWorkshopListComponent } from "./program-workshop-list/program-workshop-list.component";

export const MANAGE_WORKSHOP_ROUTES: Routes = [
    {
        path: '',
        component: ManageWorkshopLayoutComponent,
        children: [
            {
                path: '',
                component: ProgramWorkshopListComponent
            },
            {
                path: 'asistencia',
                component: AttendanceComponent
            }
        ]
    }
]