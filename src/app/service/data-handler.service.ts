import {Injectable} from '@angular/core';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {Observable} from 'rxjs';
import {TaskImpl} from '../data/dao/impl/TaskImpl';
import {CategoryImpl} from '../data/dao/impl/CategoryImpl';
import {Priority} from '../model/Priority';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  // tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  // categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  private taskImpl = new TaskImpl();
  private categoryImpl = new CategoryImpl();

  constructor() {
    // this.fillTasks();
  }


  getCategories(): Observable<Category>[] {
    return this.categoryImpl.getAll();
  }


  // tslint:disable-next-line:typedef
  // fillTasksByCategories(category: Category) {
  //   const tasks = TestData.tasks.filter(task => task.category === category);
  //   this.tasksSubject.next(tasks);
  // }

  // tslint:disable-next-line:typedef
  getAllTasks(): Observable<Task>[] {
    //  this.tasksSubject.next(TestData.tasks);
    return this.taskImpl.getAll();
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskImpl.search(category, searchText, status, priority);
  }
}
