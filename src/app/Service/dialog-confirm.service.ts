import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../Components/dialog-confirm/dialog-confirm.component';

@Injectable({
  providedIn: 'root',
})
export class DialogConfirmService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(id: number, deleteAction: (id: number) => void) {
    return this.dialog
      .open(DialogConfirmComponent, {
        width: '250px',
        enterAnimationDuration: '0ms',
        exitAnimationDuration: '0ms',
        data: { id },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          deleteAction(id);
        }
      });
  }
}
