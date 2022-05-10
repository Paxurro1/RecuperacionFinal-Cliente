import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usuarioResponse } from '../models/usuarioRespose';

@Injectable({
  providedIn: 'root'
})
export class CrudAdministradoresService {
  @Output() usuarioTrigger: EventEmitter<any> = new EventEmitter();
  public ruta: string = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  public getUsuarios() {
    let url: string = this.ruta + 'getUsuarios';
    return this.http.get<usuarioResponse>(url);
  }

  public borrarUsuario(dni: string) {
    let url: string = this.ruta + 'borrarUsuario/' + dni;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(url, { headers });
  }

  public editarUsuario(datos: object) {
    let url: string = this.ruta + "editarUsuario";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

}
