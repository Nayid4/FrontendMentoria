import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/internal/operators/map';
import { DataUser } from '../models/dataUser.model';

export const roleAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const roles = route.data?.['roles']

  if (!authService.token){
    return false
  }

  return authService.DataUser().pipe(
    map((resp: DataUser) =>  Boolean(resp && resp.rol.includes(roles)))
  )
};
