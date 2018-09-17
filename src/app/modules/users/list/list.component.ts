import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { UpdateComponent } from '../update/update.component';
import { UsersService } from '../../../shared/services/users.service';
import { Users } from '../../../shared/models/users.model';
import * as config from '../../../shared/helpers/config';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns = [
    'select',
    'username',
    'full_name',
    'mobile',
    'email',
    'actions'
  ];
  dataSource = new MatTableDataSource<Users>();
  selection = new SelectionModel<Users>(true, []);
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  loading: boolean = false;
  constructor(public _services: UsersService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.loading = true;
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
    this._services.item = new Users();
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
