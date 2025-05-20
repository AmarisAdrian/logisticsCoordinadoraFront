import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { Usuario, UsuarioResponse, UsuariosResponse } from '../models/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  register(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/register`, user);
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

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/`);
  }
  getUserById(id: string): Observable<Usuario> {
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/${id}`).pipe(
      map((response : UsuarioResponse) => response.data));
  }
  getUserByTipo(tipo: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/search/${tipo}`);
  }


}
