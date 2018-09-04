import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LanguagesService } from '@/../../src/app/shared/services/languages.service';
import { Languages } from '@/../../src/app/shared/models/languages.model';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns = ['select', 'name', 'icon', 'orders', 'actions'];
  dataSource = new MatTableDataSource<Languages>();
  selection = new SelectionModel<Languages>(true, []);
  tm: any;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  constructor(
    public languagesService: LanguagesService,
    private router: Router
  ) {
    this.languagesService.selectWithId();
  }
  ngOnInit() {
    // dataSource
    // this.languagesService.selectWithId().subscribe(data => {
    //   this.dataSource.data = data;
    // });
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // var a = this.languagesService.selectWithId().subscribe(res => {
    //   this.languagesService.items = res;
    // });
  }
  onAdd() {
    this.languagesService.item = new Languages();
    this.router.navigate([
      '/',
      this.languagesService.router.path,
      this.languagesService.router.update
    ]);
  }
  onEdit(id) {
    this.languagesService.item.id = id;
    this.router.navigate([
      '/',
      this.languagesService.router.path,
      this.languagesService.router.update
    ]);
  }
  onDelete(item) {
    console.log(item);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
