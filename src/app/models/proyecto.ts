import { Usuario } from "./usuario";
import { ProyectoResponse } from "./proyectoResponse";


export class Proyecto {

  static proyectoJSON(obj: ProyectoResponse) {
    return new Proyecto(
      obj['id'],
      obj['nombre'],
      obj['dni_jefe'],
      obj['trabajadores'],
    );
  }

  constructor(
    public id: number,
    public nombre: string,
    public dni_jefe: string,
    public trabajadores?: Usuario[],
  ) { }

}
