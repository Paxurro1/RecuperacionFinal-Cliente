import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  usuario?: Usuario;
  editar: FormGroup;
  submitted: boolean = false;
  public dniAntiguo?: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private perfilService: PerfilService,
    private storageUser: LoginStorageUserService,
  ) {
    this.usuario = storageUser.getUser();
    this.editar = this.formBuilder.group({
      email: [this.usuario?.email, Validators.compose([
        Validators.required, Validators.email])
      ],
      nombre: [this.usuario?.nombre, Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(20)])
      ],
      apellidos: [this.usuario?.apellidos, Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(30)])
      ],
      dni: [this.usuario?.dni, Validators.compose([
        Validators.required, Validators.minLength(9), Validators.maxLength(9)])
      ],
    }
    );
  }

  ngOnInit(): void {
    this.dniAntiguo = this.usuario?.dni;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editar.valid) {
      return;
    }
    var datos = {
      'dniAntiguo': this.dniAntiguo,
      'email': this.editar.value.email,
      'nombre': this.editar.value.nombre,
      'apellidos': this.editar.value.apellidos,
      'dni': this.editar.value.dni,
    }
    this.perfilService.editarPerfil(datos).subscribe({
      next: (usuario: any) => {
        this.usuario = usuario;
        this.storageUser.setUser(this.usuario!)
        console.log(this.usuario)
        this.toastr.success('Perfil editado.', 'Registro');
      },
      error: e => {
        console.log(e);
        this.toastr.error('Error al editar el perfil.', 'Error');
      }
    })
    // console.log(datos);
    // this.onReset();
  }

  get formulario() {
    return this.editar.controls;
  }

  onReset() {
    this.submitted = false;
    this.editar.reset();
  }

  salir() {
    this.toastr.warning('Has cerrado sesión.', 'AVISO')
    this.storageUser.removeUser()
    window.location.href = ""
  }

  cambiarPass() {
    this.navegar('user/cambiar-pass', {queryParams:''})
  }

  navegar(route?: string, params?: any): void {
    this.router.navigate([route], params);
  }

}
