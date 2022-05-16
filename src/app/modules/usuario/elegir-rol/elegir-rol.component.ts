import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-elegir-rol',
  templateUrl: './elegir-rol.component.html',
  styleUrls: ['./elegir-rol.component.scss']
})
export class ElegirRolComponent implements OnInit {

  usuario?: Usuario;
  rol: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private perfilService: PerfilService,
    private storageUser: LoginStorageUserService,
  ) {
    this.usuario = storageUser.getUser();
    this.rol = this.formBuilder.group({
      checkArray: this.formBuilder.array([], [Validators.required])
    }
    );
  }

  ngOnInit(): void {
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.rol.get('checkArray') as FormArray;
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

  onSubmit() {
    this.submitted = true;
    if (!this.rol.valid) {
      return;
    }
    this.usuario!.rol_activo = this.rol.value.checkArray[0]
    this.storageUser.setUser(this.usuario!)
    console.log(this.usuario);
    if (this.usuario!.rol_activo == 1) {
      window.location.href = "admin/crud-usuarios"
    } else if (this.usuario!.rol_activo == 2) {
      window.location.href = "jefe/elegir-proyecto"
    } else if (this.usuario!.rol_activo == 3) {
      window.location.href = "jefe/crud-usuarios"
    }
  }

  get formulario() {
    return this.rol.controls;
  }

}
