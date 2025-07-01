import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProblemDetails } from '../models/problemDetails.model';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  const token = authService.token;

  // Evitar interceptar solicitudes para refrescar el token
  if (req.url.includes('refresh-token')) {
    return next(req);
  }

  // Agregar token si está disponible
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthError = error.status === 401 || error.status === 403;

      if (isAuthError) {
        console.log('Error de autenticación detectado (401/403)');

        return authService.RefreshToken().pipe(
          switchMap((resp) => {
            // Guardar nuevo token y reintentar solicitud
            authService.token = resp.token;
            authService.refreshToken = resp.refreshToken;

            const newToken = authService.token;
            if (newToken) {
              req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`),
              });
            }
            return next(req);
          }),
          catchError(() => {
            console.log('Error al refrescar el token (falló refresh)');

            // Evitar bucle: solo cerrar sesión si no lo está haciendo ya
            if (!(authService as any)['estaCerrandoSesion']) {
              authService.cerrarSesion();

              const currentUrl = router.url;
              if (!['/', '/autenticacion/iniciar-sesion'].includes(currentUrl)) {
                router.navigate(['/autenticacion/iniciar-sesion']);
              }

              messageService.add({
                severity: 'error',
                summary: 'Sesión Expirada',
                detail: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
              });
            }

            return EMPTY;
          })
        );
      }

      // Manejo de errores tipo ProblemDetails
      if (error.error && error.error.title) {
        const problemDetails: ProblemDetails = error.error;
        const errorMessages = [];

        if (problemDetails.errors) {
          for (const [_, messages] of Object.entries(problemDetails.errors)) {
            errorMessages.push(...messages);
          }
        } else {
          errorMessages.push(problemDetails.title);
        }

        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessages.join('\n'),
        });
      } else {
        const errorMessage = error.status === 0
          ? 'Error de conexión con el servidor.'
          : `Error ${error.status}: ${error.message}`;

        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
        });
      }

      return EMPTY;
    })
  );
};
