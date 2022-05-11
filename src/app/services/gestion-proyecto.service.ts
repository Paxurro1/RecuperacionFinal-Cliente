import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Jefe } from '../models/jefe';
import { jefeResponse } from '../models/jefeResponse';
import { ProyectoResponse } from '../models/proyectoResponse';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class GestionProyectoService {
  public ruta: string = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  public getJefes() {
    let url: string = this.ruta + 'getJefes';
    return this.http.get<jefeResponse[]>(url).pipe(
      map((resp: jefeResponse[]) => {
        return resp.map((jefe) => Jefe.jefeJSON(jefe));
      })
    );
  }

  public getProyectos() {
    let url: string = this.ruta + 'getProyectos';
    return this.http.get<ProyectoResponse[]>(url).pipe(
      map((resp: ProyectoResponse[]) => {
        return resp.map((proyecto) => Proyecto.proyectoJSON(proyecto));
      })
    );
  }

  public actualizarProyectos(datos: object) {
    let url: string = this.ruta + "actualizarProyectos";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

}
