import { Component, OnInit } from '@angular/core';

import { Proyecto } from 'src/app/models/proyecto';
import { GestionProyectoService } from 'src/app/services/gestion-proyecto.service';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IdStorageIdService } from 'src/app/services/id.storageID.service';
import { Trabajador } from 'src/app/models/trabajador';

@Component({
  selector: 'app-gestionar-proyecto',
  templateUrl: './gestionar-proyecto.component.html',
  styleUrls: ['./gestionar-proyecto.component.scss']
})
export class GestionarProyectoComponent implements OnInit {

  trabajadores: Trabajador[] = [];
  proyectos: Proyecto[] = [];
  idProyecto?: number;

  constructor(
    private gestionService: GestionProyectoService,
    private toastr: ToastrService,
    private storageId: IdStorageIdService,
  ) {
    this.idProyecto = storageId.getId();
    console.log(this.idProyecto);
  }

  ngOnInit(): void {
    this.getTrabajadoresJefe();
    this.getProyectoConUsuariosJefe();
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  getProyectoConUsuariosJefe(){
    this.gestionService.getProyectoConUsuariosJefe(this.idProyecto!).subscribe(resultado => {
      this.proyectos = resultado
      // console.log(this.proyectos)
    });
  }

  getTrabajadoresJefe(){
    this.gestionService.getTrabajadoresJefe(this.idProyecto!).subscribe(resultado => {
      this.trabajadores = resultado
      // console.log(this.trabajadores)
    });
  }

  actualizarTrabajadoresJefe() {
    var datos = {
      'proyectos': this.proyectos
    }
    this.gestionService.actualizarTrabajadoresJefe(datos).subscribe({
      next: (res) => {
        this.toastr.success('Trabajadores actualizados.', 'Actualizado');
      },
      error: e => {
        this.toastr.error('Error al actualizar los trabajadores', 'Error');
      }
    })
  }

}
