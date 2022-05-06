import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudAdminComponent } from './crud-admin/crud-admin.component';

const routes: Routes = [
  {
    path:'crud-usuarios',
    component: CrudAdminComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
