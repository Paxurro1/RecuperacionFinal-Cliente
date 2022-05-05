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
        this.storageUser.setUser(this.usuario)
        sessionStorage.setItem(LoginComponent.usuario, JSON.stringify(usuario));
        this.toastr.success('Login realizado con éxito.', 'Login')
        console.log(this.usuario);
        window.location.href = ""
        if (this.isAdministrador()) {
          console.log('es admin')
          // window.location.href = ""
          // this.navegar('description/descriptioncomponent', {queryParams:''})
        } else if (this.isJefe()) {
          console.log('es jefe')
          // window.location.href = ""
          // this.navegar('description/descriptioncomponent', {queryParams:''})
        } else if (this.isUsuario()) {
          console.log('es usuario')
          // window.location.href = ""
          // this.navegar('description/descriptioncomponent', {queryParams:''})
        }
      },
      error: e => {
        this.toastr.error('Datos de inicio de sesión incorrectos.', 'Error')
      }
    });
    this.onReset();
  }

  isAdministrador(): boolean {
    return this.usuario.roles?.find(rol => rol.id_rol === 1) != undefined;
  }


  isJefe(): boolean {
    return this.usuario.roles?.find(rol => rol.id_rol === 2) != undefined;
  }


  isUsuario(): boolean {
    return this.usuario.roles?.find(rol => rol.id_rol === 3) != undefined;
  }

  onReset() {
    this.submitted = false;
    this.login.reset();
  }

  navegar(route?: string, params?: any): void {
    this.router.navigate([route], params);
  }
}
