import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudAdminComponent } from './crud-admin/crud-admin.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { ElegirProyectoComponent } from './elegir-proyecto/elegir-proyecto.component';
import { GestionarProyectoComponent } from './gestionar-proyecto/gestionar-proyecto.component';

const routes: Routes = [
  {
    path:'crud-usuarios',
    component: CrudAdminComponent
  },
  {
    path:'registro-usuarios',
    component: RegistroUsuarioComponent
  },
  {
    path:'elegir-proyecto',
    component: ElegirProyectoComponent
  },
  {
    path:'gestionar-proyecto',
    component: GestionarProyectoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
