import { dificultadResponse } from "./dificultadResponse";


export class Dificultad {

  static dificultadJSON(obj: Dificultad) {
    return new Dificultad(
      obj['id'],
      obj['dificultad'],
    );
  }

  constructor(
    public id: number,
    public dificultad: string,
  ) { }

}
