import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario tiene un token
  const tieneToken = !!authService.token;

  if (!tieneToken) {
    // Si no tiene token, redirigir al login
    return router.createUrlTree(['/autenticacion/iniciar-sesion']);
  } 

  // Si tiene token, verificar si ya tenemos los datos del usuario
  return authService.dataAuthenticated$.pipe(
    switchMap((datosUsuario) => {
      if (!datosUsuario || Object.keys(datosUsuario).length === 0) {
        return authService.DataUser().pipe(
          tap((datos) => authService.dataAuthenticated = datos), // Guardar los datos
          map(() => true), // Permitir el acceso
          catchError(() => of(router.createUrlTree(['/autenticacion/iniciar-sesion'])))
        );
      } else {
        return of(true); // Ya tenemos los datos, permitir el acceso
      }
    })
  );
};
