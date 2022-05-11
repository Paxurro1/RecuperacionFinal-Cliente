import { jefeResponse } from "./jefeResponse";


export class Jefe {

  static jefeJSON(obj: jefeResponse) {
    return new Jefe(
      obj['nombre'],
      obj['dni'],
    );
  }

  constructor(
    public nombre: string,
    public dni?: string,
  ) { }

}
