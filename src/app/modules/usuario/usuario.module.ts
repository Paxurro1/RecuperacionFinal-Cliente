import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { CambiarPassComponent } from './cambiar-pass/cambiar-pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElegirRolComponent } from './elegir-rol/elegir-rol.component';


@NgModule({
  declarations: [
    EditarPerfilComponent,
    CambiarPassComponent,
    ElegirRolComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsuarioModule { }
