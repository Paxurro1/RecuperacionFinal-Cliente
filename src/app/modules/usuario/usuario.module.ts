import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { CambiarPassComponent } from './cambiar-pass/cambiar-pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElegirRolComponent } from './elegir-rol/elegir-rol.component';
import { ElegirProyectoComponent } from './elegir-proyecto/elegir-proyecto.component';


@NgModule({
  declarations: [
    EditarPerfilComponent,
    CambiarPassComponent,
    ElegirRolComponent,
    ElegirProyectoComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsuarioModule { }
