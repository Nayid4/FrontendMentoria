import { Routes } from "@angular/router";
import { ManageBasicLayoutComponent } from "./manage-basic-layout/manage-basic-layout.component";

export const MANAGE_BASIC_ROUTES: Routes = [
    {
        path: '',
        component: ManageBasicLayoutComponent,
        children: [
            {
                path: 'roles',
                loadChildren: () =>
                import('./manageRole/manageRole.routes').then(
                    (m) => m.MANAGE_ROLE_ROUTES
                ),
            },
            {
                path: 'carreras',
                loadChildren: () =>
                import('./manageCareer/manageCareer.routes').then(
                    (m) => m.MANAGE_CAREER_ROUTES
                ),
            },
            {
                path: 'usuarios',
                loadChildren: () =>
                import('./manageUser/manageUser.routes').then(
                    (m) => m.MANAGE_USER_ROUTES
                ),
            },
            {
                path: 'programas',
                loadChildren: () =>
                import('./manageProgram/manageProgram.routes').then(
                    (m) => m.MANAGE_PROGRAM_ROUTES
                ),
            },
        ]
    }
]