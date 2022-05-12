import { trabajadorResponse } from "./trabajadorResponse";


export class Trabajador {

  static trabajadorJSON(obj: trabajadorResponse) {
    return new Trabajador(
      obj['nombre'],
      obj['dni'],
    );
  }

  constructor(
    public nombre: string,
    public dni?: string,
  ) { }

}
