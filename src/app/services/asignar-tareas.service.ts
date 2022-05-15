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
}
