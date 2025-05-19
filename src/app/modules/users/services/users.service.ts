// src/app/modules/users/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

export interface User {
  nombre: string;
  email: string;
  password: string;
  tipo: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    // console.log(user)
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.error || error.message;
    }
    
    console.error(error);
    return throwError(() => new Error(errorMessage));
  }
}
