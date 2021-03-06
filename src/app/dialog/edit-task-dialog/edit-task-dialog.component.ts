import {Component, Inject, OnInit} from '@angular/core';
import {Task} from '../../model/Task';
import {Category} from '../../model/Category';
import {DataHandlerService} from '../../service/data-handler.service';
import {Priority} from '../../model/Priority';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperType} from '../OperType';


@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {
  dialogTitle: string;
  task: Task;
  tmpTitle: string;
  categories: Category[];
  tmpCategory: Category;
  priorities: Priority[];
  tmpPriority: Priority;
  tmpDate: Date;
  operType: OperType;

  constructor(private dialogRef: MatDialogRef<EditTaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [Task, string, OperType],
              private dataHandler: DataHandlerService,
              private dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.task.date;
    this.dataHandler.getCategories().subscribe(items => this.categories = items);
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);
  }

  onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;
    this.dialogRef.close(this.task);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }


  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: `You really want to delete: "${this.task.title}"?`
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }


  complete(): void {
    this.dialogRef.close('complete');
  }


  activate(): void {
    this.dialogRef.close('activate');
  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }

  canActivateDesactivate(): boolean {
    return this.operType === OperType.EDIT;
  }
}
