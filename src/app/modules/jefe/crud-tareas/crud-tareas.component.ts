import { AfterViewInit, OnDestroy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudTareasService } from 'src/app/services/crud-tareas.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarea } from 'src/app/models/tarea';
import { ModificarTareaComponent } from '../modificar-tarea/modificar-tarea.component';
import { IdStorageIdService } from 'src/app/services/id.storageID.service';

@Component({
  selector: 'app-crud-tareas',
  templateUrl: './crud-tareas.component.html',
  styleUrls: ['./crud-tareas.component.scss']
})
export class CrudTareasComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  tareas: Tarea[] = [];
  idProyecto?: number;

  constructor(
    private tareasService: CrudTareasService,
    private router: Router,
    private toastr: ToastrService,
    private storageUser: LoginStorageUserService,
    private modal: NgbModal,
    private storageId: IdStorageIdService,
  ) {
    this.idProyecto = storageId.getId();
    console.log(this.idProyecto);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.tareas);
  }

  ngOnInit(): void {
    $.extend(true, $.fn.dataTable.defaults, {
      "language": { "url": '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' }
    })
    this.getTareasJefe()
  }

  rerender(): void {
    this.dtElement!.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();

    });
  }

  getTareasJefe() {
    this.tareasService.getTareasJefe(this.idProyecto!).subscribe((response) => {
      this.tareas = response;
      // console.log(this.tareas);
      this.rerender();
      this.dtTrigger.next(this.tareas);
      $.fn.dataTable.ext.errMode = 'throw';
    });
  }

  editarTarea(tarea: Tarea) {
    this.modal.open(ModificarTareaComponent, {
      size: 'xl',
      backdrop: 'static',
      keyboard: false,
    });
    this.tareasService.tareaTrigger.emit([tarea]);
  }

  public addTarea() {
    this.router.navigate(['jefe/registro-tarea']);
  }

}
