import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudAdministradoresService } from 'src/app/services/crud-administradores.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-crud-admin',
  templateUrl: './crud-admin.component.html',
  styleUrls: ['./crud-admin.component.scss']
})
export class CrudAdminComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective | undefined;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data: any;

  usuarios: any = [];
  usuario;
  dni?: string;

  constructor(
    private adminService: CrudAdministradoresService,
    private router: Router,
    private toastr: ToastrService,
    private storageUser: LoginStorageUserService,
  ) {
    this.usuario = storageUser.getUser();
    this.dni = this.usuario?.dni
  }

  ngOnInit(): void {
    this.getUsuarios()
  }

  public getUsuarios(){
    console.log('ey he entrado en get usuarios');
    this.adminService.getUsuarios().subscribe((response) => {
      this.usuarios = response;
      console.log(this.usuarios);
    });
  }

  public borrarUsuario(dniUsuario: string) {
    this.adminService.borrarUsuario(dniUsuario).subscribe({
      next: (res) => {
        this.toastr.success('Usuario eliminado.', 'Eliminado');
        this.getUsuarios();
      },
      error: e => {
        console.log(e);
        this.toastr.error('El usuario no ha podido ser eliminado.', 'Error');
      }
    })
  }
}
