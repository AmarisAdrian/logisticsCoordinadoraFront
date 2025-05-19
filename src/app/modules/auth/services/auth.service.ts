import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroments';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
   private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/auth/login`, credentials).pipe(
    tap(response => {
      this.storeTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      });
      localStorage.setItem('user', JSON.stringify(response.usuario));
    })
  );
}



 private storeTokens(tokens: { accessToken: string, refreshToken: string }): void {
  localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
}

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
   setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<{ accessToken: string }> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    return this.http.post<{ accessToken: string }>(
      `${environment.apiUrl}/auth/refresh-token`,
      { refreshToken }
    ).pipe(
      tap(response => {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
      })
    );
  }
  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    if (!user || user === 'undefined' || user === 'null') {
      return null;
    }
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }


}