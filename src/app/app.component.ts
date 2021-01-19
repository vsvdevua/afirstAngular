import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {Priority} from './model/Priority';
import {zip} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {IntroService} from './service/intro.service';
import {DeviceDetectorService} from "ngx-device-detector";

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
  private menuOpened: boolean;
  private menuMode: string;
  private menuPosition: string;
  private showBackdrop: boolean;
  private isMobile: boolean;
  private isTable: boolean;

  constructor(private dataHandler: DataHandlerService,
              private introService: IntroService,
              private deviceService: DeviceDetectorService
  ) {
    this.isMobile = deviceService.isMobile();
    this.isTable = deviceService.isTablet();
    this.showStat = true ? !this.isMobile : false;
    this.setMenuValues();
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandler.getCategories().subscribe(categories => this.categories = categories);
    this.fillCategories();
    this.onSelectCategory(null);
    if (!this.isMobile && !this.isTable) {
      this.introService.startIntroJS(true);
    }
  }

  /*
  methods for categories
   */


  private onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.updateTasksAndStat();
  }

  private onDeleteCategory(category: Category): void {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null;
      this.categoryMap.delete(cat);
      this.onSearchCategory(this.searchCategoryText);
      this.updateTasks();
    });
  }

  private onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
    });
  }


  private onAddCategory(title: string): void {
    this.dataHandler.addCategory(title).subscribe(() => this.fillCategories());
  }

  private updateCategories(): void {
    this.dataHandler.getCategories().subscribe(categories => this.categories = categories);
  }


  private onSearchCategory(title: string): void {
    this.searchCategoryText = title;
    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
      this.fillCategories();
    });
  }


  private fillCategories(): void {
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

  private onUpdateTask(task: Task): void {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.fillCategories();
      this.updateTasksAndStat();
    });
  }


  private onDeleteTask(task: Task): void {
    this.dataHandler.deleteTask(task.id).pipe(concatMap(t => {
        return this.dataHandler.getUncompletedCountInCategory(t.category).pipe(map(count => {
          return ({t, count});
        }));
      }
    )).subscribe(result => {
      const t = result.t as Task;
      if (t.category) {
        this.categoryMap.set(t.category, result.count);
      }
      this.updateTasksAndStat();
    });
  }

  private updateTasks(): void {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  private onAddTask(task: Task): void {
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

  private onFilterTasksByStatus(status: boolean): void {
    this.statusFilter = status;
    this.updateTasks();
  }


  private onSearchTasks(searchString: string): void {
    this.searchTaskText = searchString;
    this.updateTasks();
  }


  private onFilterTasksByPriority(priority: Priority): void {
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

  private onClosedMenu(): void {
    this.menuOpened = false;
  }

  private setMenuValues(): void {
    this.menuPosition = 'left';
    if (this.isMobile) {
      this.menuOpened = false;
      this.menuMode = 'over';
      this.showBackdrop = true;
    } else {
      this.menuOpened = true;
      this.menuMode = 'push';
      this.showBackdrop = false;
    }
  }

  private toggleMenu(): void {
    this.menuOpened = !this.menuOpened;
  }
}
