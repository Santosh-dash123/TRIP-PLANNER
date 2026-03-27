import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { loaderService } from '../Services/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(loaderService);

  loader.show();

  return next(req).pipe(
    finalize(() => {
      loader.hide();
    }),
  );
};
