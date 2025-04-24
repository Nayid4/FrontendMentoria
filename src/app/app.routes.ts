import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/extras/not-found/not-found.component';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        //canActivate: [noAuthGuard],
        loadChildren: () => import('./pages/user/user.routes').then(m => m.USER_ROUTES)
    },
    {
        path: 'autenticacion',
        //canActivate: [noAuthGuard],
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'dashboard',
        //canActivate: [authGuard],
        loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
