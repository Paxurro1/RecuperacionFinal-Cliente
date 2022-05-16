import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Tarea } from '../models/tarea';
import { Trabajador } from '../models/trabajador';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignarTareasService {
  public ruta: string = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  public getUsuariosProyecto(id: number) {
    let url: string = this.ruta + 'getUsuariosProyecto/' + id;
    return this.http.get<Usuario[]>(url);
  }

  public actualizarTareas(datos: object) {
    let url: string = this.ruta + "actualizarTareas";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

  public getUsuarioConTareas(id: number, dni: string) {
    let url: string = this.ruta + "getUsuarioConTareas/" + id + "/" + dni;
    return this.http.get<Trabajador[]>(url).pipe(
      map((resp: Trabajador[]) => {
        return resp;
      })
    );
  }

  public getTareasSinAsignar(id: number, dni: string) {
    let url: string = this.ruta + "getTareasSinAsignar/" + id + "/" + dni;
    return this.http.get<Tarea[]>(url).pipe(
      map((resp: Tarea[]) => {
        return resp;
      })
    );
  }

  public getUsuariosProyectoJefe(id: number) {
    let url: string = this.ruta + 'getUsuariosProyectoJefe/' + id;
    return this.http.get<Usuario[]>(url);
  }

  public getUsuarioConTareasJefe(id: number, dni: string) {
    let url: string = this.ruta + "getUsuarioConTareasJefe/" + id + "/" + dni;
    return this.http.get<Trabajador[]>(url).pipe(
      map((resp: Trabajador[]) => {
        return resp;
      })
    );
  }

  public getTareasSinAsignarJefe(id: number, dni: string) {
    let url: string = this.ruta + "getTareasSinAsignarJefe/" + id + "/" + dni;
    return this.http.get<Tarea[]>(url).pipe(
      map((resp: Tarea[]) => {
        return resp;
      })
    );
  }

  public actualizarTareasJefe(datos: object) {
    let url: string = this.ruta + "actualizarTareasJefe";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }
}
