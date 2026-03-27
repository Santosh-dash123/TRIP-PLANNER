import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  //console.log('Token:', token);
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }
  return next(req);
};
