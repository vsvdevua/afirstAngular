import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {OperType} from '../../dialog/OperType';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input()
  categories: Category[];
  @Input()
  selectedCategory: Category;
  @Output()
  selectCategory = new EventEmitter<Category>();
  @Output()
  deleteCategory = new EventEmitter<Category>();
  @Output()
  updateCategory = new EventEmitter<Category>();
  @Output()
  addCategory = new EventEmitter<string>();
  @Output()
  searchCategory = new EventEmitter<string>();

  private indexMouseMove: number;
  private searchCategoryTitle: string;

  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // @ts-ignore
    // this.dataHandler.getCategories().subscribe(categories => this.categories = categories);

  }

  showTasksByCategory(category: Category): void {
    if (this.selectedCategory === category) {
      return;
    }
    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }

  // tslint:disable-next-line:typedef
  private showEditIcon(index: number) {
    this.indexMouseMove = index;
  }

  // tslint:disable-next-line:typedef
  private openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Redact category', OperType.EDIT],
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category);
        return;
      }
      if (result as string) {
        category.title = result as string;
        this.updateCategory.emit(category);
        return;
      }
    });
  }

  // tslint:disable-next-line:typedef
  private openAddDialog() {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: ['', 'Add category', OperType.ADD],
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(result as string);
      }
    });
  }

  // tslint:disable-next-line:typedef
  private search() {
    if (this.searchCategoryTitle == null) {
      return;
    }
    this.searchCategory.emit(this.searchCategoryTitle);
  }
}
