import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add withCredentials flag
    const clonedReq = req.clone({ withCredentials: true });
    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // If a 403 error occurs, try to refresh the token
        if (error.status === 403) {
          return this.authService.refreshToken().pipe(
            switchMap(() => next.handle(req.clone({ withCredentials: true })))
          );
        }
        return throwError(() => error);
      })
    );
  }
}
