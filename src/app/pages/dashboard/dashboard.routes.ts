import { Routes } from "@angular/router";
import { DashboardLayoutComponent } from "./dashboard-layout/dashboard-layout.component";
import { HomeDashboardComponent } from "./home-dashboard/home-dashboard.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: HomeDashboardComponent
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./UserManagement/userManagement.routes').then(
            (m) => m.USER_MANAGEMENT_ROUTES
          ),
      },
    ],
  },
];