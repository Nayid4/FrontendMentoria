import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, of, EMPTY } from 'rxjs';
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

  // Agregar el token de autorización si está disponible
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthError = error.status === 401 || error.status === 403;

      if (isAuthError) {

        console.log('Error al refrescar el token 1');

        // Intentar refrescar el token si expira
        return authService.RefreshToken().pipe(
          switchMap((resp) => {
            // Guardar el nuevo token y refresh token
            authService.token = resp.token;
            authService.refreshToken = resp.refreshToken;

            // Reintentar la solicitud original con el nuevo token
            const newToken = authService.token;
            if (newToken) {
              req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`),
              });
            }
            return next(req);
          }),
          catchError(() => {
            // Si falla el refresco del token, cerrar sesión y redirigir
            console.log('Error al refrescar el token 2');
            authService.cerrarSesion();
            router.navigate(['/']);
            messageService.add({
              severity: 'error',
              summary: 'Sesión Expirada',
              detail: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
            });
            return EMPTY; // Finalizar la cadena sin errores
          })
        );
      }

      // Manejo de otros errores con ProblemDetails
      if (error.error && error.error.title) {
        const problemDetails: ProblemDetails = error.error;
        const errorMessages = [];

        // Iterar sobre el mapa de errores si está disponible
        if (problemDetails.errors) {
          for (const [key, messages] of Object.entries(problemDetails.errors)) {
            errorMessages.push(`${messages.join(', ')}`);
          }
        } else {
          // Usar el título si no hay errores específicos
          errorMessages.push(problemDetails.title);
        }

        // Mostrar los errores en el servicio de mensajes
        messageService.add({
          severity: 'error',
          summary: `Error`,
          detail: errorMessages.join('\n'),
        });
      } else {
        // Manejo genérico para errores no estándar
        const errorMessage = error.status === 0
          ? 'Error de conexión con el servidor.'
          : `Error ${error.status}: ${error.message}`;
        
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
        });
      }

      return EMPTY; // Finalizar la cadena sin errores
    })
  );
};
