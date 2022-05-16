import { usuarioResponse } from "./usuarioRespose";


export class Usuario {

  static usuarioJSON(obj: usuarioResponse) {
    return new Usuario(
      obj['email'],
      obj['nombre'],
      obj['apellidos'],
      obj['dni'],
      obj['roles'],
      obj['rol_activo'],
    );
  }

  constructor(
    public email: string,
    public nombre: string,
    public apellidos: string,
    public dni: string,
    public roles?: Array<any>,
    public rol_activo?: number,
  ) { }

  public ponerRol() {
    if (this.isAdministrador()) {
      this.rol_activo = 1
    } else if (this.isJefe()) {
      this.rol_activo = 2
    } else {
      this.rol_activo = 3
    }
  }

  public isAdministrador(): boolean {
    return this.roles!.find(rol => rol.id_rol === 1) != undefined;
  }


  public isJefe(): boolean {
    return this.roles!.find(rol => rol.id_rol === 2) != undefined;
  }


  public isUsuario(): boolean {
    return this.roles?.find(rol => rol.id_rol === 3) != undefined;
  }

}
