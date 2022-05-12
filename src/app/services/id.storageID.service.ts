import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class IdStorageIdService {

  public static readonly SESSION_STORAGE_KEY: string = "id";

  id ?: number;

  constructor() { }

  public setId(id: number) {
    this.id = id;
    sessionStorage.setItem(IdStorageIdService.SESSION_STORAGE_KEY, JSON.stringify(this.id));
    console.log(sessionStorage.getItem(IdStorageIdService.SESSION_STORAGE_KEY));
  }

  public getId() {
    let id : number | any  = sessionStorage.getItem(IdStorageIdService.SESSION_STORAGE_KEY);
    if (id) {
      this.id = id
    }
    return this.id
  }

  public removeId() {
    sessionStorage.removeItem(IdStorageIdService.SESSION_STORAGE_KEY);
  }
}
