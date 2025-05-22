import { Routes } from "@angular/router";
import { ManageActivityLayoutComponent } from "./manage-activity-layout/manage-activity-layout.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { MeetingComponent } from "./meeting/meeting.component";
import { RegisterWorkshopComponent } from "./register-workshop/register-workshop.component";

export const MANAGE_ACTIVITY_ROUTES: Routes  = [
    {
        path: '',
        component: ManageActivityLayoutComponent,
        children: [
            {
                path: 'asistencia',
                component: AttendanceComponent,
            },
            {
                path: 'reunion',
                component: MeetingComponent,
            },
            {
                path: 'registrar-taller',
                component: RegisterWorkshopComponent,
            }
        ]
    }
]