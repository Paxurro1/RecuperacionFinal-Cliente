import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CrudAdminComponent } from './crud-admin/crud-admin.component';
import { DataTablesModule } from 'angular-datatables';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';
import { ElegirProyectoComponent } from './elegir-proyecto/elegir-proyecto.component';
import { DragDropModule } from  '@angular/cdk/drag-drop';
import { GestionarProyectoComponent } from './gestionar-proyecto/gestionar-proyecto.component';


@NgModule({
  declarations: [
    CrudAdminComponent,
    RegistroUsuarioComponent,
    ModificarUsuarioComponent,
    ElegirProyectoComponent,
    GestionarProyectoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
  ]
})
export class AdminModule { }
