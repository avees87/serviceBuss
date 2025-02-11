import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  
  actionButtonLabel: string = 'close';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  addExtraClass: boolean = false;

  constructor(public snackBar: MatSnackBar) { }

  error(message: any) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.autoHide;
    config.panelClass = 'error';
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }
  success(message: any) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.autoHide;
    config.panelClass = 'success';
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }
}
