import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  private dataSource: MatTableDataSource<Task>;
  private tasks: Task[];
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog) {
  }

  @Output()
  deleteTask = new EventEmitter<Task>();
  @Output()
  updateTask = new EventEmitter<Task>();
  @Output()
  selectCategory = new EventEmitter<Category>();

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  private getPriorityColor(task: Task): string {
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    if (task.completed) {
      return '#F8F9FA';
    }
    return '#fff';
  }

  private fillTable(): void {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.tasks;
    this.addTableObjects();
    this.dataSource.sortingDataAccessor = (task, colName) => {
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category' : {
          return task.category ? task.category.title : null;
        }
        case 'date' : {
          return task.date ? task.date : null;
        }
        case 'title' : {
          return task.title;
        }

      }
    };
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Redact task'],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'complete') {
        task.completed = true;
        this.updateTask.emit(task);
      }
      if (result === 'activate') {
        task.completed = false;
        this.updateTask.emit(task);
      }
      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }
      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }
    });
  }

  // tslint:disable-next-line:typedef
  private openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: `You really want to delete: "${task.title}"?`
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task);
      }
    });
  }

  // tslint:disable-next-line:typedef
  private onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  // tslint:disable-next-line:typedef
  private onSelectCategory(category: Category) {
    this.selectCategory.emit(category);
  }
}
