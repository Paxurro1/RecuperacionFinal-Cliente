import { Trabajador } from "./trabajador";

export interface ProyectoResponse {
  id: number;
  nombre: string;
  dni_jefe: string;
  trabajadores?: Trabajador[];
}
