import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    constructor( private snackBar: MatSnackBar) { }

    private showMessage(msg: string, color: string): void {
      this.snackBar.open(msg, 'X', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: color
      });
    }

    // convenience methods
    success(message: string) {
      this.showMessage(message, 'green-snackbar');
    }

    error(message: string) {
      this.showMessage(message, 'red-snackbar');
    }

    info(message: string) {

    }

    warn(message: string) {

    }

}
