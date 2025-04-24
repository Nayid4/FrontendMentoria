import { Routes } from "@angular/router";
import { DashboardLayoutComponent } from "./dashboard-layout/dashboard-layout.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'usuario',
        loadChildren: () =>
          import('./UserManagement/userManagement.routes').then(
            (m) => m.USER_MANAGEMENT_ROUTES
          ),
      },
    ],
  },
];