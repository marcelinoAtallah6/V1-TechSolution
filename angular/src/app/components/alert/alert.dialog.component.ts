import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  template: `
    <h2 mat-dialog-title>Alert</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions>
    <c-button  value="Ok" (click)="onOkClick()">Ok</c-button>
    </mat-dialog-actions>
  `
})
export class AlertDialogComponent {
  
  constructor(@Optional() public dialogRef: MatDialogRef<AlertDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }

  onOkClick(): void {
    // Emit a cancel event
    this.dialogRef.close(false);
  }
}
