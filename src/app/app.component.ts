import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {Priority} from './model/Priority';
import {zip} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {IntroService} from './service/intro.service';

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
  private totalTasksCountInCategory: number;
  private completedCountInCategory: number;
  private uncompletedCountInCategory: number;
  private uncompletedTotalTasksCount: number;
  private showStat = true;
  private categoryMap = new Map<Category, number>();

  constructor(private dataHandler: DataHandlerService,
              private introService: IntroService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandler.getCategories().subscribe(categories => this.categories = categories);
    this.fillCategories();
    this.onSelectCategory(null);
    this.introService.startIntroJS(true);
  }

  /*
  methods for categories
   */

  // tslint:disable-next-line:typedef
  private onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasksAndStat();
  }

// tslint:disable-next-line:typedef
  private onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null;
      this.categoryMap.delete(cat);
      this.onSearchCategory(this.searchCategoryText);
      this.updateTasks();
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
    this.dataHandler.addCategory(title).subscribe(() => this.fillCategories());
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
      this.fillCategories();
    });
  }

  // tslint:disable-next-line:typedef
  private fillCategories() {
    if (this.categoryMap) {
      this.categoryMap.clear();
    }
    this.categories = this.categories.sort((a, b) => a.title.localeCompare(b.title));
    this.categories.forEach(cat => {
      this.dataHandler.getUncompletedCountInCategory(cat).subscribe(count => this.categoryMap.set(cat, count));
    });
  }

  /*
  methods for tasks
   */

  // tslint:disable-next-line:typedef
  private onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.fillCategories();
      this.updateTasksAndStat();
    });
  }

  // tslint:disable-next-line:typedef
  private onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).pipe(concatMap(t => {
        return this.dataHandler.getUncompletedCountInCategory(t.category).pipe(map(count => {
          return ({t, count});
        }));
      }
    )).subscribe(result => {
      const t = result.t as Task;
      if (t.category){
        this.categoryMap.set(t.category, result.count);
      }
      this.updateTasksAndStat();
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
    this.dataHandler.addTask(task).pipe(
      concatMap(t => {
          return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
            return ({t: task, count});
          }));
        }
      )
    ).subscribe(result => {
      const t = result.t as Task;
      if (t.category) {
        this.categoryMap.set(t.category, result.count);
      }
      this.updateTasksAndStat();
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

  /*
   methods for statistics
    */
  private updateTasksAndStat(): void {
    this.updateTasks();
    this.updateSatat();
  }

  private updateSatat(): void {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncomletedTotalCount()
    )
      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        this.uncompletedTotalTasksCount = array[3];
      });
  }

  private toggleStat(showStat: boolean): void {
    this.showStat = showStat;
  }
}
