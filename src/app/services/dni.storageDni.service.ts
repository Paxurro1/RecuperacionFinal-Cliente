import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class DniStorageDniService {

  public static readonly SESSION_STORAGE_KEY: string = "dni";

  dni ?: string;

  constructor() { }

  public setDni(dni: string) {
    this.dni = dni;
    sessionStorage.setItem(DniStorageDniService.SESSION_STORAGE_KEY, JSON.stringify(this.dni));
    console.log(sessionStorage.getItem(DniStorageDniService.SESSION_STORAGE_KEY));
  }

  public getDni() {
    let dni : string | any  = sessionStorage.getItem(DniStorageDniService.SESSION_STORAGE_KEY);
    if (dni) {
      this.dni = dni
    }
    return this.dni?.replace(/['"]+/g, '')
  }

  public removeDni() {
    sessionStorage.removeItem(DniStorageDniService.SESSION_STORAGE_KEY);
  }
}
