import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil.service';
import { ToastrService } from 'ngx-toastr';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.component.html',
  styleUrls: ['./cambiar-pass.component.scss']
})
export class CambiarPassComponent implements OnInit {

  usuario?: Usuario;
  editar: FormGroup;
  submitted: boolean = false;
  public dniAntiguo?: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private perfilService: PerfilService,
    private storageUser: LoginStorageUserService,
  ) {
    this.usuario = storageUser.getUser();
    this.editar = this.formBuilder.group({
      pass1: ['', Validators.compose([
        Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{8,30})')])
      ],
      pass2: ['', Validators.compose([
        Validators.required])
      ],
    },
      {
        validator: [this.passwordMatchValidator]
      }
    );
  }

  ngOnInit(): void {
    this.dniAntiguo = this.usuario?.dni;
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('pass1')?.value;
    const confirmPassword: string = control.get('pass2')?.value;
    if (password !== confirmPassword) {
      control.get('pass2')?.setErrors({ NoPassswordMatch: true });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editar.valid) {
      return;
    }
    var datos = {
      'dniAntiguo': this.dniAntiguo,
      'pass': this.editar.value.pass1,
    }
    console.log(datos);
    this.perfilService.camibiarPass(datos).subscribe({
      next: (respuesta: any) => {
        this.toastr.success('Contraseña cambiada.', 'Registro');
      },
      error: e => {
        console.log(e);
        this.toastr.error('Error al editar la contraseña.', 'Error');
      }
    })
    // this.onReset();
  }

  get formulario() {
    return this.editar.controls;
  }

  onReset() {
    this.submitted = false;
    this.editar.reset();
  }

}
