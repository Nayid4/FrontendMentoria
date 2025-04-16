import { inject } from '@angular/core';
import { CanActivateFn, CanMatch, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el usuario está autenticado, permitir el acceso.
  if (authService.getTokenUser()) {
    return router.createUrlTree(['/dashboard']);
    //return false;
  } 

  return true;
};
