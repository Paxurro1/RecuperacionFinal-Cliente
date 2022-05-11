import { Component, OnInit } from '@angular/core';

import { Proyecto } from 'src/app/models/proyecto';
import { GestionProyectoService } from 'src/app/services/gestion-proyecto.service';
import { ToastrService } from 'ngx-toastr';
import { Jefe } from 'src/app/models/jefe';

@Component({
  selector: 'app-elegir-proyecto',
  templateUrl: './elegir-proyecto.component.html',
  styleUrls: ['./elegir-proyecto.component.scss']
})
export class ElegirProyectoComponent implements OnInit {

  jefes: Jefe[] = [];
  proyectos: Proyecto[] = [];

  constructor(
    private gestionService: GestionProyectoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getProyectos();
    this.getJefes();
  }

  getJefes() {
    this.gestionService.getJefes().subscribe((response) => {
      this.jefes = response;
    });
  }

  getProyectos() {
    this.gestionService.getProyectos().subscribe((response) => {
      this.proyectos = response;
    });
  }

  guardarDatos() {
    var bandera = true;
    this.proyectos.forEach(proyecto => {
      if (!proyecto.nombre && bandera) {
        bandera = false;
      }
    });
    if (bandera) {
      var datos = {
        'proyectos': this.proyectos
      }
      this.gestionService.actualizarProyectos(datos).subscribe({
        next: (res) => {
          this.toastr.success('Proyectos actualizados.', 'Actualizado');
        },
        error: e => {
          this.toastr.error('Error al actualizar los proyectos', 'Error');
        }
      })
    } else {
      this.toastr.error('Todos los proyectos deben tener nombre.', 'Error');
    }
  }

  verProyecto() {

  }

}
