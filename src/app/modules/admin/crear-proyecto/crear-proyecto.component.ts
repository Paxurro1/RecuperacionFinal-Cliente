import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { GestionProyectoService } from 'src/app/services/gestion-proyecto.service';
import { ToastrService } from 'ngx-toastr';
import { Jefe } from 'src/app/models/jefe';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss']
})
export class CrearProyectoComponent implements OnInit {

  jefes: Jefe[] = [];
  registro: FormGroup;
  submitted: boolean = false;

  constructor(
    private gestionService: GestionProyectoService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    this.registro = this.formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(40)])
      ],
      jefe: ['', Validators.compose([
        Validators.required])
      ]
    }
    );
  }

  ngOnInit(): void {
    this.getJefes()
  }

  getJefes() {
    this.gestionService.getJefes().subscribe((response) => {
      this.jefes = response;
      // console.log(this.jefes)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.registro.valid) {
      return;
    }
    var datos = {
      'nombre': this.registro.value.nombre,
      'jefe': this.registro.value.jefe
    }
    // console.log(datos)
    this.gestionService.addProyecto(datos).subscribe({
      next: (res) => {
        this.toastr.success('Tarea registrada.', 'Registro');
      },
      error: e => {
        console.log(e);
        this.toastr.error('La tarea no ha podido registrarse.', 'Error');
      }
    })
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
