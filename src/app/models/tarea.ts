import { TareaResponse } from "./tareaResponse";

export class Tarea {

  static tareaJSON(obj: TareaResponse) {
    return new Tarea(
      obj['id'],
      obj['descripcion'],
      obj['dificultad'],
      obj['estimacion'],
      obj['estado'],
      obj['f_comienzo'],
      obj['f_fin'],
      obj['porcentaje'],
    );
  }

  constructor(
    public id: number,
    public descripcion: string,
    public dificultad: string,
    public estimacion: number,
    public estado: number,
    public f_comienzo: Date,
    public f_fin: Date,
    public porcentaje: number,
  ) { }

}
