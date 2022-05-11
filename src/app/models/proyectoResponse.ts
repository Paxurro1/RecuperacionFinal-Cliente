import { Usuario } from "./usuario";

export interface ProyectoResponse {
  id: number;
  nombre: string;
  dni_jefe: string;
  trabajadores?: Usuario[];
}
