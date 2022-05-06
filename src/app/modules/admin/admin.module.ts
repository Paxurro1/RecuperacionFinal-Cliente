import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CrudAdminComponent } from './crud-admin/crud-admin.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    CrudAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule
  ]
})
export class AdminModule { }
