import { Component, OnInit } from '@angular/core';
import { IdStorageIdService } from 'src/app/services/id.storageID.service';
import { AsignarTareasService } from 'src/app/services/asignar-tareas.service';
import { DniStorageDniService } from 'src/app/services/dni.storageDni.service';
import { Tarea } from 'src/app/models/tarea';
import { Trabajador } from 'src/app/models/trabajador';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asignar-tareas',
  templateUrl: './asignar-tareas.component.html',
  styleUrls: ['./asignar-tareas.component.scss']
})
export class AsignarTareasComponent implements OnInit {

  tareas: Tarea[] = [];
  trabajadores: Trabajador[] = [];

  dniUsuario?: string;
  idProyecto?: number;

  constructor(
    private storageId: IdStorageIdService,
    private storageDni: DniStorageDniService,
    private asignarService: AsignarTareasService,
    private toastr: ToastrService,
  ) {
    this.idProyecto = storageId.getId();
    console.log(this.idProyecto);
    this.dniUsuario = storageDni.getDni();
    console.log(this.dniUsuario);
  }

  ngOnInit(): void {
    this.getUsuarioConTareas();
    this.getTareasSinAsignar();
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

  getUsuarioConTareas(){
    this.asignarService.getUsuarioConTareas(this.idProyecto!, this.dniUsuario!).subscribe(resultado => {
      this.trabajadores = resultado
      // console.log(this.trabajadores)
    });
  }

  getTareasSinAsignar(){
    this.asignarService.getTareasSinAsignar(this.idProyecto!, this.dniUsuario!).subscribe(resultado => {
      this.tareas = resultado
      // console.log(this.tareas)
    });
  }

  actualizarTareas() {
    var datos = {
      'tareasSolas': this.tareas,
      'trabajadores': this.trabajadores
    }
    // console.log(datos)
    this.asignarService.actualizarTareas(datos).subscribe({
      next: (res) => {
        this.toastr.success('Trabajadores actualizados.', 'Actualizado');
      },
      error: e => {
        this.toastr.error('Error al actualizar los trabajadores', 'Error');
      }
    })
  }

}
