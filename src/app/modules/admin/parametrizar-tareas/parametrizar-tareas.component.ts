import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { ParametrizarService } from 'src/app/services/parametrizar.service';
import { ToastrService } from 'ngx-toastr';
import { Maximo } from 'src/app/models/maximo';
import { Dificultad } from 'src/app/models/dificultad';

@Component({
  selector: 'app-parametrizar-tareas',
  templateUrl: './parametrizar-tareas.component.html',
  styleUrls: ['./parametrizar-tareas.component.scss']
})
export class ParametrizarTareasComponent implements OnInit {

  dias: FormGroup;
  submitted: boolean = false;
  maximo?: Maximo;
  dificultades: Dificultad[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private parametrizarService: ParametrizarService,
  ) {
    this.dias = this.formBuilder.group({});
    //console.log(this.maximo)
    this.dias = this.formBuilder.group({
      maximo: [this.maximo?.dias, Validators.compose([
        Validators.required, Validators.min(1)])
      ]
    }
    );
  }

  ngOnInit(): void {
    this.getMaximo()
    this.getDificultades()
  }

  construirFormulario() {
    this.dias = this.formBuilder.group({
      maximo: [this.maximo?.dias, Validators.compose([
        Validators.required, Validators.min(1)])
      ]
    }
    );
  }

  getMaximo() {
    this.parametrizarService.getMaximo().subscribe((response) => {
      this.maximo = response;
      this.construirFormulario();
    });

  }

  getDificultades() {
    this.parametrizarService.getDificultades().subscribe((response) => {
      this.dificultades = response;
      // console.log(this.dificultades);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.dias.valid) {
      return;
    }
    var datos = {
      'id': this.maximo?.id,
      'dias': this.dias.value.maximo,
    }
    console.log(datos)
    this.parametrizarService.setMaximo(datos).subscribe({
      next: (res) => {
        this.toastr.success('Días máximos actualizados.', 'Actualizado');
      },
      error: e => {
        this.toastr.error('No se pudo actualizar', 'Error');
      }
    })
  }

  get formulario() {
    return this.dias.controls;
  }

  borrarDificultad(id:number){
    // console.log(this.dificultades?.length)
    // console.log(id)
    if (this.dificultades!.length == 1) {
      this.toastr.error('Tiene que haber al menos una dificultad', 'Error');
    } else {
      this.parametrizarService.borrarDificultad(id).subscribe({
        next: (res) => {
          this.getDificultades();
          this.toastr.success('Dificultad borrada', 'Actualizado');
        },
        error: e => {
          this.toastr.error('No se pudo borrar', 'Error');
        }
      })
    }
  }

  establecerDificultades(){
    var datos = {
      'dificultades': this.dificultades
    }
    console.log(datos);
    this.parametrizarService.establecerDificultades(datos).subscribe({
      next: (res) => {
        this.toastr.success('Dificultades actualizadas', 'Actualizado');
      },
      error: e => {
        this.toastr.error('Error al actualizar las dificultades', 'Error');
      }
    })
  }

  addDificultad(){
    this.parametrizarService.addDificultad().subscribe((response) => {
      this.getDificultades();
      // console.log(this.dificultades);
    });
  }

}
