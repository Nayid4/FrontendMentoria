import { Routes } from "@angular/router";
import { ManageWorkshopLayoutComponent } from "./manage-workshop-layout/manage-workshop-layout.component";
import { AttendanceComponent } from "./attendance/attendance.component";

export const MANAGE_WORKSHOP_ROUTES: Routes = [
    {
        path: '',
        component: ManageWorkshopLayoutComponent,
        children: [
            {
                path: 'asistencia',
                component: AttendanceComponent
            }
        ]
    }
]