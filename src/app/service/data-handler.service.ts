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

  getCategories(): Observable<Category[]> {
    return this.categoryImpl.getAll();
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskImpl.getAll();
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskImpl.search(category, searchText, status, priority);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskImpl.update(task);
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityImpl.getAll();
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskImpl.delete(id);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryImpl.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryImpl.update(category);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskImpl.add(task);
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
}
