import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  const servicioAuth = inject(AuthService);

  if (servicioAuth.token) {
    loading.show();
  }else {
    loading.showGuest();
  }

  // Mostrar la solicitud en la consola
  //console.log('Solicitud HTTP:', req.url);

  loading.show();

  return next(req).pipe(
    finalize(() => {
      setTimeout(() => {
        if (servicioAuth.token) {
          loading.hide();
          loading.hideGuest();
        }else {
          loading.hideGuest();
        }
      }, 500); // 500ms de retraso
    })
  );
};
