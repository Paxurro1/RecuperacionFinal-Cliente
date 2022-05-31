import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dificultad } from '../models/dificultad';
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

  public getDificultades() {
    let url: string = this.ruta + 'getDificultades';
    return this.http.get<Dificultad[]>(url);
  }

  public borrarDificultad(id: number) {
    let url: string = this.ruta + 'borrarDificultad/' + id;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(url, { headers });
  }

  public addDificultad() {
    let url: string = this.ruta + 'addDificultad';
    return this.http.get<Dificultad[]>(url);
  }

  public establecerDificultades(datos: object) {
    let url: string = this.ruta + "establecerDificultades";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }
}
