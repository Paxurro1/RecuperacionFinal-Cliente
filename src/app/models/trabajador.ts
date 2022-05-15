import { Tarea } from "./tarea";
import { trabajadorResponse } from "./trabajadorResponse";


export class Trabajador {

  static trabajadorJSON(obj: trabajadorResponse) {
    return new Trabajador(
      obj['nombre'],
      obj['dni'],
      obj['tareas'],
    );
  }

  constructor(
    public nombre: string,
    public dni: string,
    public tareas?: Tarea[]
  ) { }

}
