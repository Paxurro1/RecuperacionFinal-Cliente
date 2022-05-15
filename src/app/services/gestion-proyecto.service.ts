import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Jefe } from '../models/jefe';
import { jefeResponse } from '../models/jefeResponse';
import { ProyectoResponse } from '../models/proyectoResponse';
import { Proyecto } from '../models/proyecto';
import { Trabajador } from '../models/trabajador';

@Injectable({
  providedIn: 'root'
})
export class GestionProyectoService {
  @Output() proyectoIdTrigger: EventEmitter<any> = new EventEmitter();
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

  public getProyectoConUsuarios(id: number){
    let url: string = this.ruta + "getProyectoConUsuarios/"+id;
    return this.http.get<ProyectoResponse[]>(url).pipe(
      map((resp: ProyectoResponse[]) => {
        return resp;
      })
    );
  }

  public getTrabajadores(id: number){
    let url: string = this.ruta + "getTrabajadores/"+id;
    return this.http.get<Trabajador[]>(url).pipe(
      map((resp: Trabajador[]) => {
        return resp;
      })
    );
  }

  public actualizarTrabajadores(datos: object) {
    let url: string = this.ruta + "actualizarTrabajadores";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

  public addProyecto(datos: object) {
    let url: string = this.ruta + "addProyecto";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

  public borrarProyecto(id: number) {
    let url: string = this.ruta + 'borrarProyecto/' + id;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(url, { headers });
  }

}
