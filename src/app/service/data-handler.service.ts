import {Injectable} from '@angular/core';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {Observable} from 'rxjs';
import {TaskImpl} from '../data/dao/impl/TaskImpl';
import {CategoryImpl} from '../data/dao/impl/CategoryImpl';
import {Priority} from '../model/Priority';
import {PriorityImpl} from '../data/dao/impl/PriorityImpl';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private taskImpl = new TaskImpl();
  private categoryImpl = new CategoryImpl();
  private priorityImpl = new PriorityImpl();

  constructor() {
  }

  /*
  Task
   */


  getAllTasks(): Observable<Task[]> {
    return this.taskImpl.getAll();
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskImpl.search(category, searchText, status, priority);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskImpl.update(task);
  }


  deleteTask(id: number): Observable<Task> {
    return this.taskImpl.delete(id);
  }


  addTask(task: Task): Observable<Task> {
    return this.taskImpl.add(task);
  }

  /*
  Category
   */
  deleteCategory(id: number): Observable<Category> {
    return this.categoryImpl.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryImpl.update(category);
  }

  getCategories(): Observable<Category[]> {
    return this.categoryImpl.getAll();
  }

  addCategory(title: string): Observable<Category> {
    return this.categoryImpl.add(new Category(null, title));
  }

  searchCategories(title: string): Observable<Category[]> {
    return this.categoryImpl.search(title);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskImpl.getCompletedCountInCategory(category);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskImpl.getTotalCountInCategory(category);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskImpl.getUncompletedCountInCategory(category);
  }

  getUncomletedTotalCount(): Observable<number> {
    return this.taskImpl.getUncompletedCountInCategory(null);
  }

  /*
  Priority
   */
  getAllPriorities(): Observable<Priority[]> {
    return this.priorityImpl.getAll();
  }

  updatePriority(priority: Priority): Observable<Priority> {
    return this.priorityImpl.update(priority);
  }

  deletePriority(id: number): Observable<Priority> {
    return this.priorityImpl.delete(id);
  }

  addPriority(priority: Priority): Observable<Priority> {
    return this.priorityImpl.add(priority);
  }
}
