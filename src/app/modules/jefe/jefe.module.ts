import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JefeRoutingModule } from './jefe-routing.module';
import { ElegirProyectoComponent } from './elegir-proyecto/elegir-proyecto.component';
import { GestionarProyectoComponent } from './gestionar-proyecto/gestionar-proyecto.component';
import { CrudTareasComponent } from './crud-tareas/crud-tareas.component';
import { ModificarTareaComponent } from './modificar-tarea/modificar-tarea.component';
import { RegistroTareaComponent } from './registro-tarea/registro-tarea.component';
import { ElegirUsuarioComponent } from './elegir-usuario/elegir-usuario.component';
import { AsignarTareasComponent } from './asignar-tareas/asignar-tareas.component';
import { DragDropModule } from  '@angular/cdk/drag-drop';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ElegirProyectoComponent,
    GestionarProyectoComponent,
    CrudTareasComponent,
    ModificarTareaComponent,
    RegistroTareaComponent,
    ElegirUsuarioComponent,
    AsignarTareasComponent
  ],
  imports: [
    CommonModule,
    JefeRoutingModule,
    DragDropModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class JefeModule { }
