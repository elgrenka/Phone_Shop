import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isAuthenticated()) {
      request = request.clone({
        setParams: {
          auth: this.auth.token!
        }
      })
    }

    return next.handle(request)
    .pipe(
      catchError(error => {
        if (error.status === 401) {
          this.auth.logout();
          this. router.navigate(['/admin', 'login']);
        }
        // deprecated code
        // return throwError(error);
        return throwError(() => new Error(error));
      })
    )
  }
}
