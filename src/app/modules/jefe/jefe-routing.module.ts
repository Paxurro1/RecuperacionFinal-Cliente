import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElegirProyectoComponent } from './elegir-proyecto/elegir-proyecto.component';
import { AsignarTareasComponent } from './asignar-tareas/asignar-tareas.component';
import { CrudTareasComponent } from './crud-tareas/crud-tareas.component';
import { ElegirUsuarioComponent } from './elegir-usuario/elegir-usuario.component';
import { GestionarProyectoComponent } from './gestionar-proyecto/gestionar-proyecto.component';
import { ModificarTareaComponent } from './modificar-tarea/modificar-tarea.component';
import { RegistroTareaComponent } from './registro-tarea/registro-tarea.component';

const routes: Routes = [
  {
    path:'elegir-proyecto',
    component: ElegirProyectoComponent
  },
  {
    path:'asignar-tareas',
    component: AsignarTareasComponent
  },
  {
    path:'crud-tareas',
    component: CrudTareasComponent
  },
  {
    path:'elegir-usuario',
    component: ElegirUsuarioComponent
  },
  {
    path:'gestionar-proyecto',
    component: GestionarProyectoComponent
  },
  {
    path:'modificar-tarea',
    component: ModificarTareaComponent
  },
  {
    path:'registro-tarea',
    component: RegistroTareaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JefeRoutingModule { }
