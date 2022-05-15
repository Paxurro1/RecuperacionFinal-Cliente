import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudAdminComponent } from './crud-admin/crud-admin.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { ElegirProyectoComponent } from './elegir-proyecto/elegir-proyecto.component';
import { GestionarProyectoComponent } from './gestionar-proyecto/gestionar-proyecto.component';
import { CrudTareasComponent } from './crud-tareas/crud-tareas.component';
import { RegistroTareaComponent } from './registro-tarea/registro-tarea.component';
import { ElegirUsuarioComponent } from './elegir-usuario/elegir-usuario.component';
import { AsignarTareasComponent } from './asignar-tareas/asignar-tareas.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';

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
  {
    path:'crud-tareas',
    component: CrudTareasComponent
  },
  {
    path:'registro-tarea',
    component: RegistroTareaComponent
  },
  {
    path:'elegir-usuario',
    component: ElegirUsuarioComponent
  },
  {
    path:'asignar-tareas',
    component: AsignarTareasComponent
  },
  {
    path:'crear-proyecto',
    component: CrearProyectoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
