import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { registroService } from 'src/app/services/registro.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent implements OnInit {

  registro: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private registroService: registroService,
  ) {
    this.registro = this.formBuilder.group({
      checkArray: this.formBuilder.array([], [Validators.required]),
      email: ['', Validators.compose([
        Validators.required, Validators.email])
      ],
      nombre: ['', Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(20)])
      ],
      apellidos: ['', Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(30)])
      ],
      dni: ['', Validators.compose([
        Validators.required, Validators.minLength(9), Validators.maxLength(9)])
      ],
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
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.registro.get('checkArray') as FormArray;
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

  onSubmit() {
    this.submitted = true;
    if (!this.registro.valid) {
      return;
    }
    var datos = {
      'email': this.registro.value.email,
      'nombre': this.registro.value.nombre,
      'apellidos': this.registro.value.apellidos,
      'dni': this.registro.value.dni,
      'pass': this.registro.value.pass1,
      'roles': this.registro.value.checkArray,
    }
    this.registroService.addUsuario(datos).subscribe({
      next: (res) => {
        this.toastr.success('Usuario registrado.', 'Registro');
      },
      error: e => {
        console.log(e);
        this.toastr.error('El usuario no ha podido registrarse.', 'Error');
      }
    })
    // console.log(datos);
    this.onReset();
  }

  get formulario() {
    return this.registro.controls;
  }

  onReset() {
    this.submitted = false;
    this.registro.reset();
  }

}
