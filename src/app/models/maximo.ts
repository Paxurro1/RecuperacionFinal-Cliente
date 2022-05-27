import { maximoResponse } from "./maximoResponse";


export class Maximo {

  static maximoJSON(obj: Maximo) {
    return new Maximo(
      obj['id'],
      obj['dias'],
    );
  }

  constructor(
    public id: number,
    public dias: number,
  ) { }

}
