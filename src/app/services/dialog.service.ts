import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}
  async confirmacion(title: string, message: string) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title, message },
      width: '400px',
    });
    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe((res) => {
        resolve(res.respuesta);
      });
    }).then( respuesta => {
      return respuesta;
    }).catch( err => {
      return;
    });
  }
}
