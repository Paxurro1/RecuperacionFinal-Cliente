import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { CrudTareasService } from 'src/app/services/crud-tareas.service';
import { ToastrService } from 'ngx-toastr';
import { IdStorageIdService } from 'src/app/services/id.storageID.service';
import { Maximo } from 'src/app/models/maximo';
import { ParametrizarService } from 'src/app/services/parametrizar.service';

@Component({
  selector: 'app-registro-tarea',
  templateUrl: './registro-tarea.component.html',
  styleUrls: ['./registro-tarea.component.scss']
})
export class RegistroTareaComponent implements OnInit {

  registro: FormGroup;
  submitted: boolean = false;
  maximo?: Maximo;
  idProyecto?: number;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private tareasService: CrudTareasService,
    private storageId: IdStorageIdService,
    private parametrizarService: ParametrizarService,
  ) {
    this.idProyecto = storageId.getId();
    // console.log(this.idProyecto);
    this.registro = this.formBuilder.group({
      descripcion: ['', Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(40)])
      ],
      dificultad: ['', Validators.compose([
        Validators.required])
      ],
      estimacion: ['', Validators.compose([
        Validators.required, Validators.min(1), Validators.max(60)])
      ],
      f_comienzo: ['', Validators.compose([
        Validators.required])
      ],
      f_fin: ['', Validators.compose([
        Validators.required])
      ],
    },
    {
      validator: [this.mayorQueHoy, this.mayorQueFechaInicio]
    }
    );
  }

  ngOnInit(): void {
    this.getMaximo()
  }

  construirFormulario() {
    this.registro = this.formBuilder.group({
      descripcion: ['', Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(40)])
      ],
      dificultad: ['', Validators.compose([
        Validators.required])
      ],
      estimacion: ['', Validators.compose([
        Validators.required, Validators.min(1), Validators.max(this.maximo!.dias)])
      ],
      f_comienzo: ['', Validators.compose([
        Validators.required])
      ],
      f_fin: ['', Validators.compose([
        Validators.required])
      ],
    },
    {
      validator: [this.mayorQueHoy, this.mayorQueFechaInicio]
    }
    );
  }

  getMaximo() {
    this.parametrizarService.getMaximo().subscribe((response) => {
      this.maximo = response;
      this.construirFormulario();
    });
  }

  mayorQueHoy(control: AbstractControl) {
    const fechaComienzo = new Date(control.get('f_comienzo')?.value);
    var fecha = new Date();
    let ayer = new Date(fecha.getTime() - 24 * 60 * 60 * 1000);
    // console.log(fechaComienzo)
    // console.log(hoy)
    if (fechaComienzo < ayer) {
      control.get('f_comienzo')?.setErrors({ mayorQueHoy: true });
    }
  }

  // menorQueDosMeses(control: AbstractControl) {
  //   const fechafin = new Date(control.get('f_fin')?.value);
  //   const fechaComienzo = new Date(control.get('f_comienzo')?.value);
  //   let sesenta = new Date(fechaComienzo.getTime() + (24 * 60 * 60 * 1000) * this.maximo!.dias);
  //   if (fechafin > sesenta) {
  //     control.get('f_fin')?.setErrors({ menorQueDosMeses: true });
  //   }
  // }

  mayorQueFechaInicio(control: AbstractControl) {
    const fechaComienzo = new Date(control.get('f_comienzo')?.value);
    const fechafin = new Date(control.get('f_fin')?.value);
    if (fechaComienzo >= fechafin) {
      control.get('f_fin')?.setErrors({ mayorQueFechaInicio: true });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.registro.valid) {
      return;
    }
    const fechafin = new Date(this.registro.value.f_fin);
    const fechaComienzo = new Date(this.registro.value.f_comienzo);
    let sesenta = new Date(fechaComienzo.getTime() + (24 * 60 * 60 * 1000) * this.maximo!.dias);
    if (fechafin < sesenta) {
      var datos = {
        'descripcion': this.registro.value.descripcion,
        'dificultad': this.registro.value.dificultad,
        'estimacion': this.registro.value.estimacion,
        'f_comienzo': this.registro.value.f_comienzo,
        'f_fin': this.registro.value.f_fin,
        'id_proyecto': this.idProyecto,
      }
      // console.log(datos)

      this.tareasService.addTarea(datos).subscribe({
        next: (res) => {
          this.toastr.success('Tarea registrada.', 'Registro');
        },
        error: e => {
          console.log(e);
          this.toastr.error('La tarea no ha podido registrarse.', 'Error');
        }
      })
      // console.log(datos);
      this.onReset();
    } else{
      this.toastr.error('La fecha de finalización no puede ser mayor a ' + this.maximo!.dias + ' respecto a la fecha de inicio.', 'Error');
    }

  }

  get formulario() {
    return this.registro.controls;
  }

  onReset() {
    this.submitted = false;
    this.registro.reset();
  }

}
