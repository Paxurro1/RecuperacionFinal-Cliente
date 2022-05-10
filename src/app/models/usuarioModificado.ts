import { usuarioModificadoResponse } from "./usuarioModificadoResponse";


export class UsuarioModificado {

  static usuarioJSON(obj: usuarioModificadoResponse) {
    return new UsuarioModificado(
      obj['email'],
      obj['nombre'],
      obj['apellidos'],
      obj['dni'],
      obj['roles'],
      obj['pass']
    );
  }

  constructor(
    public email: string,
    public nombre: string,
    public apellidos: string,
    public dni?: string,
    public roles?: Array<any>,
    public pass?: string
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
