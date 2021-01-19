import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {OperType} from '../../dialog/OperType';
import {DeviceDetectorService} from "ngx-device-detector";


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

  indexMouseMove: number;
  searchCategoryTitle: string;
  selectedCategoryMap: Map<Category, number>;
  isMobile: boolean;
  isTablet: boolean;

  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog,
              private deviceService: DeviceDetectorService) {
    this.isMobile = deviceService.isMobile();
    this.isTablet = deviceService.isTablet();
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


  showEditIcon(index: number): void {
    this.indexMouseMove = index;
  }


  openEditDialog(category: Category): void {
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


  openAddDialog(): void {
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

  search(): void {
    if (this.searchCategoryTitle == null) {
      return;
    }
    this.searchCategory.emit(this.searchCategoryTitle);
  }
}
