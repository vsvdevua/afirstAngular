import {CommonDao} from './CommonDao';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';

export interface CategoryDao extends CommonDao<Category> {
  search(title: string): Observable<Category[]>;
}
