import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usuarioResponse } from '../models/usuarioRespose';

@Injectable({
  providedIn: 'root'
})
export class registroService {
  public ruta: string = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  public addUsuario(datos: object) {
    let url: string = this.ruta + "addUsuario";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }


}
