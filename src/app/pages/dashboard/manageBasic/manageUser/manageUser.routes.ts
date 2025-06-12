import { Routes } from "@angular/router";
import { ManageUserLayoutComponent } from "./manage-user-layout/manage-user-layout.component";
import { UserListComponent } from "./user-list/user-list.component";

export const MANAGE_USER_ROUTES: Routes = [
    {
        path: '',
        component: ManageUserLayoutComponent,
        children: [
            { path: '', component: UserListComponent }
        ]
    }
]