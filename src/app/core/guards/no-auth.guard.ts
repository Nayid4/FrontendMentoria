import { inject } from '@angular/core';
import { CanActivateFn, CanMatch, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const esLogin = state.url === '/autenticacion/iniciar-sesion';

  if (authService.getTokenUser() && !esLogin) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};

