import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudAdminComponent } from './crud-admin/crud-admin.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

const routes: Routes = [
  {
    path:'crud-usuarios',
    component: CrudAdminComponent
  },
  {
    path:'registro-usuarios',
    component: RegistroUsuarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
