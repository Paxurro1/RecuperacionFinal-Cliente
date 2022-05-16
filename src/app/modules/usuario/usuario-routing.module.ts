import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component'
import { CambiarPassComponent } from './cambiar-pass/cambiar-pass.component'
import { ElegirRolComponent } from './elegir-rol/elegir-rol.component'

const routes: Routes = [
  {
    path:'editar-perfil',
    component: EditarPerfilComponent
  },
  {
    path:'cambiar-pass',
    component: CambiarPassComponent
  },
  {
    path:'elegir-rol',
    component: ElegirRolComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
