import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor, 
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  const isLoginOrRefresh =
    request.url.includes('/auth/login') || request.url.includes('/auth/refresh-token');

  const accessToken = this.authService.getAccessToken();

  let authReq = request;
  if (accessToken && !isLoginOrRefresh) {
    authReq = this.addTokenHeader(request, accessToken);
  }

  return next.handle(authReq).pipe(
    catchError(error => {
      if (!isLoginOrRefresh && error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(authReq, next);
      }

      return throwError(() => error);
    })
  );
}


  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
  }

 private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if (!this.isRefreshing) {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.authService.refreshToken().pipe(
      switchMap(({ accessToken }) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(accessToken);
        return next.handle(this.addTokenHeader(request, accessToken));
      }),
      catchError(err => {
        this.isRefreshing = false;
        this.authService.logout();
        return throwError(() => err);
      })
    );
  } else {
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(token => next.handle(this.addTokenHeader(request, token!)))
    );
  }
}

}
