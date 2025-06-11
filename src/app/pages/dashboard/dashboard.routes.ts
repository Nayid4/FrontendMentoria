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
      {
        path: 'actividad',
        loadChildren: () =>
          import('./manageActivity/manageActivity.routes').then(
            (m) => m.MANAGE_ACTIVITY_ROUTES
          ),
      },
      {
        path: 'certificacion',
        loadChildren: () =>
          import('./manageCertification/manageCertification.routes').then(
            (m) => m.MANAGE_CERTIFICATION_ROUTES
          ),
      },
      {
        path: 'reconocimiento',
        loadChildren: () =>
          import('./manageRecognition/manageRecognition.routes').then(
            (m) => m.MANAGE_RECOGNITION_ROUTES
          ),
      },
      {
        path: 'voluntariado',
        loadChildren: () =>
          import('./manageValunteering/manageValunteering.routes').then(
            (m) => m.MANAGE_VALUNTEERING_ROUTES
          ),
      },
      {
        path: 'taller',
        loadChildren: () =>
          import('./manageWorkshop/manageWorkshop.routes').then(
            (m) => m.MANAGE_WORKSHOP_ROUTES
          ),
      },
      {
        path: 'seguimiento',
        loadChildren: () =>
          import('./manageFollowUp/manageFollowUp.routes').then(
            (m) => m.MANAGE_FOLLOW_UP_ROUTES
          ),
      },
      {
        path: 'mentoria',
        loadChildren: () =>
          import('./manageMentoring/manageMentoring.routes').then(
            (m) => m.MANAGE_MENTORING_ROUTES
          ),
      },
      {
        path: 'basicos',
        loadChildren: () =>
          import('./manageBasic/manageBasic.routes').then(
            (m) => m.MANAGE_BASIC_ROUTES
          ),
      }
    ],
  },
];