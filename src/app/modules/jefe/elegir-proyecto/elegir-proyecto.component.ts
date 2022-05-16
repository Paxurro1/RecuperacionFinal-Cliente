import { Component, OnInit } from '@angular/core';

import { Proyecto } from 'src/app/models/proyecto';
import { GestionProyectoService } from 'src/app/services/gestion-proyecto.service';
import { Router } from '@angular/router';
import { IdStorageIdService } from 'src/app/services/id.storageID.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-elegir-proyecto',
  templateUrl: './elegir-proyecto.component.html',
  styleUrls: ['./elegir-proyecto.component.scss']
})
export class ElegirProyectoComponent implements OnInit {

  usuario?: Usuario;
  proyectos: Proyecto[] = [];

  constructor(
    private gestionService: GestionProyectoService,
    private router: Router,
    private storageId: IdStorageIdService,
    private storageUser: LoginStorageUserService,
  ) {
    this.usuario = storageUser.getUser();
  }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos() {
    this.gestionService.getProyectosJefe(this.usuario!.dni).subscribe((response) => {
      this.proyectos = response;
    });
  }

  verProyecto(id: number) {
    this.storageId.setId(id);
    this.navegar('jefe/gestionar-proyecto', {queryParams:''})
  }

  verTareas(id: number) {
    this.storageId.setId(id);
    this.navegar('jefe/crud-tareas', {queryParams:''})
  }

  asignarTareas(id: number) {
    this.storageId.setId(id);
    this.navegar('jefe/elegir-usuario', {queryParams:''})
  }

  navegar(route?: string, params?: any): void {
    this.router.navigate([route], params);
  }

}
