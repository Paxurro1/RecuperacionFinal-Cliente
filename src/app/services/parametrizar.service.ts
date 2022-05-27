import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maximo } from '../models/maximo';

@Injectable({
  providedIn: 'root'
})
export class ParametrizarService {
  public ruta: string = "http://localhost:8000/api/";
  constructor(private http: HttpClient,) { }

  public getMaximo() {
    let url: string = this.ruta + 'getMaximo';
    return this.http.get<Maximo>(url);
  }

  public setMaximo(datos: object) {
    let url: string = this.ruta + "setMaximo";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }
}
