import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from '../../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public static readonly usuario: string = "usuario";
  public imgLogo: string;
  login: FormGroup;
  submitted: boolean = false;
  usuario!: Usuario;
  constructor(
    private LoginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private storageUser: LoginStorageUserService,
  ) {
    this.imgLogo = "./assets/logo.png";
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern]]
    });
  }

  ngOnInit(): void {
  }

  get formulario() {
    return this.login.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.login.valid) {
      return;
    }
    var datos = {
      'email': this.login.value.email,
      'pass': this.login.value.password
    }
    this.LoginService.login(datos).subscribe({
      next: (usuario: any) => {
        this.usuario = usuario;
        this.toastr.success('Login realizado con éxito.', 'Login')
        this.ponerRol();
        this.storageUser.setUser(this.usuario)
        sessionStorage.setItem(LoginComponent.usuario, JSON.stringify(usuario));
        console.log(this.usuario);
        if (this.usuario.rol_activo == 1) {
          window.location.href = "admin/crud-usuarios"
        } else if (this.usuario.rol_activo == 2) {
          window.location.href = "jefe/elegir-proyecto"
        } else if (this.usuario.rol_activo == 3) {
          window.location.href = "jefe/crud-usuarios"
        }
      },
      error: e => {
        this.toastr.error('Datos de inicio de sesión incorrectos.', 'Error')
      }
    });
    this.onReset();
  }

  public ponerRol() {
    if (this.isAdministrador()) {
      this.usuario.rol_activo = 1
    } else if (this.isJefe()) {
      this.usuario.rol_activo = 2
    } else {
      this.usuario.rol_activo = 3
    }
  }

  public isAdministrador(): boolean {
    return this.usuario.roles!.find(rol => rol.id_rol === 1) != undefined;
  }


  public isJefe(): boolean {
    return this.usuario.roles!.find(rol => rol.id_rol === 2) != undefined;
  }


  public isUsuario(): boolean {
    return this.usuario.roles?.find(rol => rol.id_rol === 3) != undefined;
  }

  onReset() {
    this.submitted = false;
    this.login.reset();
  }
}
