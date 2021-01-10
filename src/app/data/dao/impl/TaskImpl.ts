import {TaskDao} from '../interface/TaskDao';
import {Observable, of} from 'rxjs';
import {Category} from '../../../model/Category';
import { Task } from 'src/app/model/Task';
import { Priority } from 'src/app/model/Priority';
import {TestData} from '../../TestData';

export class TaskImpl implements TaskDao{

  add(T): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    return undefined;
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(todo => todo.id === id));
  }

  getAll(): Observable<Task>[] {
    // @ts-ignore
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searhTodo(category, searchText, status, priority) );
  }

  update(T): Observable<Task> {
    return undefined;
  }

  private searhTodo(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {

    let allTasks = TestData.tasks;
    if (category != null){
      allTasks = allTasks.filter(todo => todo.category === category);
    }
    return allTasks;
  }
}
