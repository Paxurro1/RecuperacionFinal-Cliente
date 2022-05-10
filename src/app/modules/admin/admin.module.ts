import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CrudAdminComponent } from './crud-admin/crud-admin.component';
import { DataTablesModule } from 'angular-datatables';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';


@NgModule({
  declarations: [
    CrudAdminComponent,
    RegistroUsuarioComponent,
    ModificarUsuarioComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
