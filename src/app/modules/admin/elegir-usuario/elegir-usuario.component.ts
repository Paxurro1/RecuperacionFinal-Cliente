import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { IdStorageIdService } from 'src/app/services/id.storageID.service';
import { AsignarTareasService } from 'src/app/services/asignar-tareas.service';
import { DniStorageDniService } from 'src/app/services/dni.storageDni.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elegir-usuario',
  templateUrl: './elegir-usuario.component.html',
  styleUrls: ['./elegir-usuario.component.scss']
})
export class ElegirUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  idProyecto?: number;

  constructor(
    private storageId: IdStorageIdService,
    private storageDni: DniStorageDniService,
    private AsignarService: AsignarTareasService,
    private router: Router,
  ) {
    this.idProyecto = storageId.getId();
    console.log(this.idProyecto);
  }

  ngOnInit(): void {
    this.getUsuariosProyecto();
  }

  getUsuariosProyecto() {
    this.AsignarService.getUsuariosProyecto(this.idProyecto!).subscribe((response) => {
      this.usuarios = response;
      // console.log(this.usuarios);
    });
  }

  asignarTareas(dni: string) {
    console.log(dni)
    this.storageDni.setDni(dni);
    this.navegar('admin/asignar-tareas', { queryParams: '' })
  }

  navegar(route?: string, params?: any): void {
    this.router.navigate([route], params);
  }

}
