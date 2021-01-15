import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {Priority} from './model/Priority';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title = 'VSVDev';
  private tasks: Task[];
  private categories: Category[];
  private priorities: Priority[];
  private selectedCategory: Category = null;
  private searchTaskText = '';
  private statusFilter: boolean;
  private priorityFilter: Priority;
  private searchCategoryText = '';

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandler.getCategories().subscribe(categories => this.categories = categories);
    this.onSelectCategory(null);
  }

  /*
  methods for categories
   */

  // tslint:disable-next-line:typedef
  private onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasks();
  }

// tslint:disable-next-line:typedef
  private onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null;
      this.onSelectCategory(null);
    });
  }

  // tslint:disable-next-line:typedef
  private onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  // tslint:disable-next-line:typedef
  private onAddCategory(title: string) {
    this.dataHandler.addCategory(title).subscribe(() => this.updateCategories());
  }

  // tslint:disable-next-line:typedef
  private updateCategories() {
    this.dataHandler.getCategories().subscribe(categories => this.categories = categories);
  }

  // tslint:disable-next-line:typedef
  private onSearchCategory(title: string) {
    this.searchCategoryText = title;
    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }

  /*
  methods for tasks
   */

  // tslint:disable-next-line:typedef
  private onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(cat => {
      this.updateTasks();
    });
  }

  // tslint:disable-next-line:typedef
  private onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(cat => {
      this.updateTasks();
    });
  }

  // tslint:disable-next-line:typedef
  private updateTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

// tslint:disable-next-line:typedef
  private onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(result => {
      this.updateTasks();
    });
  }

  /*
  Filters
   */

  // tslint:disable-next-line:typedef
  private onFilterTasksByStatus(status: boolean) {
    this.statusFilter = status;
    this.updateTasks();
  }

  // tslint:disable-next-line:typedef
  private onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

// tslint:disable-next-line:typedef
  private onFilterTasksByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.updateTasks();
  }


}
