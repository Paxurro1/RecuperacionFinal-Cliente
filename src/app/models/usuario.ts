import { usuarioResponse } from "./usuarioRespose";


export class Usuario {

  static usuarioJSON(obj: usuarioResponse) {
    return new Usuario(
      obj['email'],
      obj['nombre'],
      obj['apellidos'],
      obj['dni'],
      obj['roles'],
    );
  }

  constructor(
    public email: string,
    public nombre: string,
    public apellidos: string,
    public dni: string,
    public roles?: Array<any>,
  ) { }

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
