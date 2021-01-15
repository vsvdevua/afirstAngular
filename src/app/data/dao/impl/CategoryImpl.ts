import {CategoryDao} from '../interface/CategoryDao';
import {Observable, of} from 'rxjs';
import {Category} from '../../../model/Category';
import {TestData} from '../../TestData';

export class CategoryImpl implements CategoryDao {
  add(category: Category): Observable<Category> {
    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory();
    }
    TestData.categories.push(category);
    return of(category);
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });
    const tmpCategory = TestData.categories.find(t => t.id === id);
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);
    return of(tmpCategory);
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return of(TestData.categories.filter(
      cat => cat.title.toUpperCase().includes(title.toUpperCase())
    ).sort((c1, c2) => c1.title.localeCompare(c2.title)));
  }

  update(category: Category): Observable<Category> {
    const tmpCategory = TestData.categories.find(t => t.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);
    return of(tmpCategory);
  }

  private getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map(category => category.id)) + 1;
  }
}
