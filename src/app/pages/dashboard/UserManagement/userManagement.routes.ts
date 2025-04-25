import { Routes } from "@angular/router";
import { UserManagementLayoutComponent } from "./user-management-layout/user-management-layout.component";
import { UserListComponent } from "./user-list/user-list.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";



export const USER_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    component: UserManagementLayoutComponent,
    children: [
      { path: '', component: UserListComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
];