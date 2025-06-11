import { Routes } from "@angular/router";
import { RoleListComponent } from "./role-list/role-list.component";
import { ManageRoleLayoutComponent } from "./manage-role-layout/manage-role-layout.component";

export const MANAGE_ROLE_ROUTES: Routes = [
    {
        path: '',
        component: ManageRoleLayoutComponent,
        children: [
            { path: '', component: RoleListComponent }
        ]
    }
]