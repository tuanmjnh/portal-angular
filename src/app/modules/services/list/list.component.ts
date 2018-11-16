import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ServicesService } from '../../../shared/services/services.service';
import { Services } from '../../../shared/models/services.model';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { UpdateComponent } from '../update/update.component';
import * as config from '../../../shared/helpers/config';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns = [
    'select',
    'title',
    'images',
    'icons',
    'orders',
    'actions'
  ];
  dataSource = new MatTableDataSource<Services>();
  selection = new SelectionModel<Services>(true, []);
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  loading: boolean = false;
  constructor(public _services: ServicesService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.loading = true;
    this._services.app_key = 'dvcntt';
    // this._services.select().the((data: any) => {
    //   this.dataSource.data = data.data;
    // });
    this._services.select().subscribe(
      (data: any) => {
        this._services.items = data.data;
        this.dataSource.data = this._services.items;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      },
      () => {
        this.loading = false;
      }
    );
  }
  handleAdd() {
    this._services.item = new Services();
    const dialogRef = this.dialog.open(UpdateComponent, config.DIALOG_OPTIONS);
    dialogRef.afterClosed().subscribe(rs => {
      this.getData();
    });
  }
  handleEdit(item) {
    this._services.item = item;
    const dialogRef = this.dialog.open(UpdateComponent, config.DIALOG_OPTIONS);
    dialogRef.afterClosed().subscribe(rs => {
      this.getData();
    });
  }
  handleDelete(item) {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed().subscribe(rs => {
      if (rs) this._services.delete([item]);
    });
  }
  handleDeleteAll() {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed().subscribe(rs => {
      if (rs) this._services.delete(this.selection.selected);
    });
  }
  handleFlag(flag) {
    this._services.query.flag = flag;
    this.getData();
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
    this._services.query.filter = filterValue;
    this.dataSource.filter = filterValue;
  }
}
