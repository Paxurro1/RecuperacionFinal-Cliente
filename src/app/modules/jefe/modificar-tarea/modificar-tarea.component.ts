import { Component, OnInit } from '@angular/core';
import { CrudTareasService } from 'src/app/services/crud-tareas.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarea } from 'src/app/models/tarea';
import { Dificultad } from 'src/app/models/dificultad';
import { Maximo } from 'src/app/models/maximo';
import { ParametrizarService } from 'src/app/services/parametrizar.service';

@Component({
  selector: 'app-modificar-tarea',
  templateUrl: './modificar-tarea.component.html',
  styleUrls: ['./modificar-tarea.component.scss']
})
export class ModificarTareaComponent implements OnInit {

  datosTarea: FormGroup;
  submitted: boolean = false;
  maximo?: Maximo;
  dificultades: Dificultad[] = [];
  public tareaModificada?: Tarea;

  constructor(
    private modalActive: NgbActiveModal,
    private tareasService: CrudTareasService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private parametrizarService: ParametrizarService,
  ) {
    this.datosTarea = this.formBuilder.group({});
    this.tareasService.tareaTrigger.subscribe({
      next: (data: Array<any>) => {
        this.tareaModificada = data[0];
        this.construirFormulario();
      },
    });
  }

  ngOnInit(): void {
    this.getMaximo()
    this.getDificultades()
  }

  getDificultades() {
    this.parametrizarService.getDificultades().subscribe((response) => {
      this.dificultades = response;
      // console.log(this.dificultades);
    });
  }

  construirFormulario() {
    this.datosTarea = this.formBuilder.group({
      id: [this.tareaModificada?.id, Validators.compose([
        Validators.required])
      ],
      descripcion: [this.tareaModificada?.descripcion, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(40)])
      ],
      dificultad: [this.tareaModificada?.dificultad, Validators.compose([
        Validators.required])
      ],
      estimacion: [this.tareaModificada?.estimacion, Validators.compose([
        Validators.required, Validators.min(1), Validators.max(60)])
      ],
      estado: [this.tareaModificada?.estado, Validators.compose([
        Validators.required])
      ],
      f_comienzo: [this.tareaModificada?.f_comienzo, Validators.compose([
        Validators.required])
      ],
      f_fin: [this.tareaModificada?.f_fin, Validators.compose([
        Validators.required])
      ],
      porcentaje: [this.tareaModificada?.porcentaje, Validators.compose([
        Validators.required])
      ]
    },
      {
        validator: [this.mayorQueFechaInicio, this.menorQueDosMeses]
      }
    );
  }

  construirFormulario2() {
    this.datosTarea = this.formBuilder.group({
      id: [this.tareaModificada?.id, Validators.compose([
        Validators.required])
      ],
      descripcion: [this.tareaModificada?.descripcion, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(40)])
      ],
      dificultad: [this.tareaModificada?.dificultad, Validators.compose([
        Validators.required])
      ],
      estimacion: [this.tareaModificada?.estimacion, Validators.compose([
        Validators.required, Validators.min(1), Validators.max(this.maximo!.dias)])
      ],
      estado: [this.tareaModificada?.estado, Validators.compose([
        Validators.required])
      ],
      f_comienzo: [this.tareaModificada?.f_comienzo, Validators.compose([
        Validators.required])
      ],
      f_fin: [this.tareaModificada?.f_fin, Validators.compose([
        Validators.required])
      ],
      porcentaje: [this.tareaModificada?.porcentaje, Validators.compose([
        Validators.required])
      ]
    },
      {
        validator: [this.mayorQueFechaInicio, this.menorQueDosMeses]
      }
    );
  }

  // mayorQueHoy(control: AbstractControl) {
  //   const fechaComienzo = new Date(control.get('f_comienzo')?.value);
  //   var fecha = new Date();
  //   let ayer = new Date(fecha.getTime() - 24 * 60 * 60 * 1000);
  //   // console.log(fechaComienzo)
  //   // console.log(hoy)
  //   if (fechaComienzo < ayer) {
  //     control.get('f_comienzo')?.setErrors({ mayorQueHoy: true });
  //   }
  // }

  menorQueDosMeses(control: AbstractControl) {
    // const fechafin = new Date(control.get('f_fin')?.value);
    // const fechaComienzo = new Date(control.get('f_comienzo')?.value);
    // let sesenta = new Date(fechaComienzo.getTime() + (24 * 60 * 60 * 1000) * this.maximo!.dias);
    // if (fechafin > sesenta) {
    //   control.get('f_fin')?.setErrors({ menorQueDosMeses: true });
    // }
  }

  mayorQueFechaInicio(control: AbstractControl) {
    const fechaComienzo = new Date(control.get('f_comienzo')?.value);
    const fechafin = new Date(control.get('f_fin')?.value);
    if (fechaComienzo >= fechafin) {
      control.get('f_fin')?.setErrors({ mayorQueFechaInicio: true });
    }
  }

  getMaximo() {
    this.parametrizarService.getMaximo().subscribe((response) => {
      this.maximo = response;
      this.construirFormulario2();
    });
  }

  async closeModal() {
    this.modalActive.close();
  }

  onSubmit() {
    this.submitted = true;
    if (!this.datosTarea.valid) {
      return;
    }
    const fechafin = new Date(this.datosTarea.value.f_fin);
    const fechaComienzo = new Date(this.datosTarea.value.f_comienzo);
    let sesenta = new Date(fechaComienzo.getTime() + (24 * 60 * 60 * 1000) * this.maximo!.dias + 1);
    if (fechafin < sesenta) {
      var datos = {
        'id': this.datosTarea.value.id,
        'descripcion': this.datosTarea.value.descripcion,
        'dificultad': this.datosTarea.value.dificultad,
        'estimacion': this.datosTarea.value.estimacion,
        'estado': this.datosTarea.value.estado,
        'f_comienzo': this.datosTarea.value.f_comienzo,
        'f_fin': this.datosTarea.value.f_fin,
        'porcentaje': this.datosTarea.value.porcentaje
      }
      // console.log(datos)
      this.tareasService.editarTareaJefe(datos).subscribe({
        next: (res) => {
          this.toastr.success('Tarea actualizada.', 'Actualizado');
          this.closeModal();
        },
        error: e => {
          this.toastr.error('La tarea no pudo ser actualizada', 'Error');
        }
      })
    } else {
      this.datosTarea.get('f_fin')?.setErrors({ menorQueDosMeses: true });
    }
  }

  get formulario() {
    return this.datosTarea.controls;
  }

}
