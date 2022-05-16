import { Component, OnInit } from '@angular/core';
import { IdStorageIdService } from 'src/app/services/id.storageID.service';
import { AsignarTareasService } from 'src/app/services/asignar-tareas.service';
import { DniStorageDniService } from 'src/app/services/dni.storageDni.service';
import { Tarea } from 'src/app/models/tarea';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestionar-tareas',
  templateUrl: './gestionar-tareas.component.html',
  styleUrls: ['./gestionar-tareas.component.scss']
})
export class GestionarTareasComponent implements OnInit {

  hacer: Tarea[] = [];
  haciendo: Tarea[] = [];
  hecho: Tarea[] = [];

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
    this.getHacer()
    this.getHaciendo()
    this.getHecho()
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

  getHacer(){
    this.asignarService.getHacer(this.dniUsuario!, this.idProyecto!).subscribe((response) => {
      this.hacer = response;
      // console.log(this.hacer)
    });
  }

  getHaciendo(){
    this.asignarService.getHaciendo(this.dniUsuario!, this.idProyecto!).subscribe((response) => {
      this.haciendo = response;
      // console.log(this.haciendo)
    });
  }

  getHecho(){
    this.asignarService.getHecho(this.dniUsuario!, this.idProyecto!).subscribe((response) => {
      this.hecho = response;
      // console.log(this.hecho)
    });
  }

  actualizarTareas() {
    var datos = {
      'hacer': this.hacer,
      'haciendo': this.haciendo,
      'hecho': this.hecho,
    }
    // console.log(datos)
    this.asignarService.actualizarTareasUsuario(datos).subscribe({
      next: (res) => {
        this.toastr.success('Tareas actualizadas.', 'Actualizado');
      },
      error: e => {
        this.toastr.error('Error al actualizar las tareas', 'Error');
      }
    })
  }

}
