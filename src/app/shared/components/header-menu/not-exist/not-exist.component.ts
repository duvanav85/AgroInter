import { Component } from '@angular/core';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-exist.component',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './not-exist.component.html',
  styles: ``,
})
export class NotExistComponent {
  constructor(public dialogRef: MatDialogRef<NotExistComponent>) {}
  close(): void {
    this.dialogRef.close(true);
  }
}
