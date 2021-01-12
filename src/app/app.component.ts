import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'VSVDev';
  tasks: Task[];
  categories: Category[];
  private selectedCategory: Category = null;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    // @ts-ignore
    this.dataHandler.getCategories().subscribe(categories => this.categories = categories);
    this.onSelectCategory(null);
  }

  // tslint:disable-next-line:typedef
 private onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.dataHandler.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  // tslint:disable-next-line:typedef
  private onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }

  // tslint:disable-next-line:typedef
 private onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }
}
