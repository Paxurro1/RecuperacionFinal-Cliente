import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  public ruta: string = "http://localhost:8000/api/";
  constructor(private http: HttpClient,) { }

  public editarPerfil(datos: object) {
    let url: string = this.ruta + "editarPerfil";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

  public camibiarPass(datos: object) {
    let url: string = this.ruta + "cambiarPass";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }
}
