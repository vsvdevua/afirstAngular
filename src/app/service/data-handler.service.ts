import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';
import {Task} from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }
  getCategories(): Category[] {
    return TestData.categories;
  }
  getTasksByCategories(category: Category): Task[] {
   const tasks = TestData.tasks.filter(task => task.category === category );
   return tasks;
  }
 getTasks(): Task[]{
    return TestData.tasks;
 }
}
