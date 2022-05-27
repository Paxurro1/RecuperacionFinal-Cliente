import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { ParametrizarService } from 'src/app/services/parametrizar.service';
import { ToastrService } from 'ngx-toastr';
import { Maximo } from 'src/app/models/maximo';

@Component({
  selector: 'app-parametrizar-tareas',
  templateUrl: './parametrizar-tareas.component.html',
  styleUrls: ['./parametrizar-tareas.component.scss']
})
export class ParametrizarTareasComponent implements OnInit {

  dias: FormGroup;
  submitted: boolean = false;
  maximo?: Maximo;

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

  onSubmit() {
    this.submitted = true;
    if (!this.dias.valid) {
      return;
    }
    var datos = {
      'id': this.maximo?.id,
      'dias': this.dias.value.dias,
    }
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

}
