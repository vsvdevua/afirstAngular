import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {
  private dialogTitle: string;
  private categoryTitle: string;
  private canDelete: boolean;

  constructor(private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [string, string],
              private dialog: MatDialog) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.canDelete = true;
    if (!this.categoryTitle){
      this.canDelete = false;
    }
  }

// tslint:disable-next-line:typedef
  private onConfirm() {
    this.dialogRef.close(this.categoryTitle);
  }

// tslint:disable-next-line:typedef
  private onCancel() {
    this.dialogRef.close(false);
  }

// tslint:disable-next-line:typedef
  private delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: `You really want to delete: "${this.categoryTitle}"?`
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }
}
