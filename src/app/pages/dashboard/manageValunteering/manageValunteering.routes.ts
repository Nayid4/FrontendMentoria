import { Routes } from "@angular/router";
import { ManageVolunteeringLayoutComponent } from "./manage-volunteering-layout/manage-volunteering-layout.component";
import { AttendanceComponent } from "./attendance/attendance.component";

export const MANAGE_VALUNTEERING_ROUTES: Routes = [
    {
        path: '',
        component: ManageVolunteeringLayoutComponent,
        children: [
            {
                path: 'asistencia',
                component: AttendanceComponent
            }
        ]
    }
];