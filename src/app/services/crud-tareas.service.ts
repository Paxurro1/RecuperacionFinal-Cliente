import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TareaResponse } from '../models/tareaResponse';

@Injectable({
  providedIn: 'root'
})
export class CrudTareasService {
  @Output() tareaTrigger: EventEmitter<any> = new EventEmitter();
  public ruta: string = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  public getTareas(id: number) {
    let url: string = this.ruta + 'getTareas/' + id;
    return this.http.get<TareaResponse[]>(url);
  }

  public borrarTarea(id: number) {
    let url: string = this.ruta + 'borrarTarea/' + id;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(url, { headers });
  }

  public editarTarea(datos: object) {
    let url: string = this.ruta + "editarTarea";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

  public addTarea(datos: object) {
    let url: string = this.ruta + "addTarea";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

  public getTareasJefe(id: number) {
    let url: string = this.ruta + 'getTareasJefe/' + id;
    return this.http.get<TareaResponse[]>(url);
  }

  public editarTareaJefe(datos: object) {
    let url: string = this.ruta + "editarTareaJefe";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

  public addTareaJefe(datos: object) {
    let url: string = this.ruta + "addTareaJefe";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

  public borrarTareaJefe(id: number) {
    let url: string = this.ruta + 'borrarTareaJefe/' + id;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(url, { headers });
  }

}
