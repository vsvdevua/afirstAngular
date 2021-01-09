import {CategoryDao} from '../interface/CategoryDao';
import {Observable, of} from 'rxjs';
import {Category} from '../../../model/Category';
import {TestData} from '../../TestData';

export class CategoryImpl implements CategoryDao{
  add(T): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {
    return undefined;
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category>[] {
    // @ts-ignore
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

  update(T): Observable<Category> {
    return undefined;
  }

}
