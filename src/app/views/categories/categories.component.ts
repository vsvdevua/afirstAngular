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
  @Input()
  uncompletedTotal: number;

  @Input('categoryMap')
  set setCategoryMap(categotyMap: Map<Category, number>) {
    this.selectedCategoryMap = categotyMap;
  }

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
  private selectedCategoryMap: Map<Category, number>;

  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.dataHandler.getCategories().subscribe(categories => this.categories = categories);

  }

  showTasksByCategory(category: Category): void {
    if (this.selectedCategory === category) {
      return;
    }
    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }


  private showEditIcon(index: number): void {
    this.indexMouseMove = index;
  }


  private openEditDialog(category: Category): void {
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


  private openAddDialog(): void {
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

  private search(): void {
    if (this.searchCategoryTitle == null) {
      return;
    }
    this.searchCategory.emit(this.searchCategoryTitle);
  }
}
