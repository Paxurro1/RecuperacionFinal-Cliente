import { Tarea } from "./tarea";

export interface trabajadorResponse {
  nombre: string;
  dni: string;
  tareas: Tarea[]
}
