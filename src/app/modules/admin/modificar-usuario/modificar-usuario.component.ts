import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioModificado } from 'src/app/models/usuarioModificado';
import { CrudAdministradoresService } from 'src/app/services/crud-administradores.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {

  datosUsuario: FormGroup;
  submitted: boolean = false;

  public usuarioModificado?: UsuarioModificado;
  public dniAntiguo?: string;

  constructor(
    private modalActive: NgbActiveModal,
    private adminService: CrudAdministradoresService,
    private formBuilder: FormBuilder,
    public dialogService: DialogService,
    private toastr: ToastrService,
  ) {
    this.datosUsuario = this.formBuilder.group({});

    this.adminService.usuarioTrigger.subscribe({
      next: (data: Array<any>) => {
        this.usuarioModificado = data[0];
        this.construirFormulario();
      },
    });

  }

  ngOnInit(): void {
    this.dniAntiguo = this.usuarioModificado?.dni;
    console.log(this.dniAntiguo);
    this.marcarRoles();
  }

  marcarRoles() {
    let rolesAux = document.querySelectorAll('#rolesUsuario input') as NodeListOf<HTMLInputElement>;
    this.usuarioModificado?.roles!.forEach((r: any) => {
      rolesAux.forEach((element: { checked: any; value: string; }) => {
        // console.log(r)
        if (element) {
          let elemento = parseInt(element.value);
          // console.log(elemento)
          if (r.id_rol == elemento) {
            // console.log('entro')
            element.checked = true;
          }
        }
      });
    });
  }

  construirFormulario() {
    this.datosUsuario = this.formBuilder.group({
      checkArray: this.formBuilder.array([], [Validators.required]),
      email: [this.usuarioModificado?.email, Validators.compose([
        Validators.required, Validators.email])
      ],
      nombre: [this.usuarioModificado?.nombre, Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(20)])
      ],
      apellidos: [this.usuarioModificado?.apellidos, Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(30)])
      ],
      dni: [this.usuarioModificado?.dni, Validators.compose([
        Validators.required, Validators.minLength(9), Validators.maxLength(9)])
      ],
      pass1: ['Superman888', Validators.compose([
        Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{8,30})')])
      ],
      pass2: ['Superman888', Validators.compose([
        Validators.required])
      ],
    },
      {
        validator: [this.passwordMatchValidator]
      }
    );
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.datosUsuario.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('pass1')?.value;
    const confirmPassword: string = control.get('pass2')?.value;
    if (password !== confirmPassword) {
      control.get('pass2')?.setErrors({ NoPassswordMatch: true });
    }
  }

  async closeModal() {
    this.modalActive.close();
  }

  onSubmit() {
    this.submitted = true;
    if (!this.datosUsuario.valid) {
      return;
    }
    var datos = {
      'email': this.datosUsuario.value.email,
      'nombre': this.datosUsuario.value.nombre,
      'apellidos': this.datosUsuario.value.apellidos,
      'dni': this.datosUsuario.value.dni,
      'roles': this.datosUsuario.value.checkArray,
      'dniAntiguo': this.dniAntiguo,
    }
    // console.log(datos)
    this.adminService.editarUsuario(datos).subscribe({
      next: (res) => {
        this.toastr.success('Usuario actualizado.', 'Actualizado');
        this.closeModal();
      },
      error: e => {
        this.toastr.error('El dni o el email ya está registrado', 'Error');
      }
    })
  }

  get formulario() {
    return this.datosUsuario.controls;
  }


}
