import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirmation</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions>
    <div class="confirmationBtns">
      <c-button value="Cancel" (click)="onCancelClick()">Cancel</c-button>
      <c-button  value="Confirm" (click)="onConfirmClick()">Confirm</c-button>
    </div>
    </mat-dialog-actions>
  `,
  styleUrls: ['alert.component.css']

})
export class ConfirmationDialogComponent {
  constructor(
    @Optional() public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  onCancelClick(): void {
    // Emit a cancel event
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    // Emit a confirm event
    this.dialogRef.close(true);
  }
}
