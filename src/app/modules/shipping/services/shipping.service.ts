import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shipping,Ruta } from '../models/shipping.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private apiUrl = 'http://localhost:3000/api/v1/shipping';
  private apiRutas = 'http://localhost:3000/api/v1/rutas';
  constructor(private http: HttpClient) {}

  createShipping(data: Shipping): Observable<any> {
    return this.http.post(`${this.apiRutas}/register`, data);
  }
  getrutas(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(`${this.apiRutas}/`);
  }
}
