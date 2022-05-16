export interface usuarioResponse {
  email: string;
  nombre: string;
  apellidos: string;
  dni: string;
  roles?: [];
  rol_activo?: number;
}
