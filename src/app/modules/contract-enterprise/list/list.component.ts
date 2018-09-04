import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ContractEnterpriseService } from '../../../shared/services/contract-enterprise.service';
import { ContractEnterprise } from '../../../shared/models/contract-enterprise.model';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { UpdateComponent } from '../update/update.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns = ['select', 'contract_code', 'group_id', 'customer_name', 'start_at', 'end_at', 'actions'];
  dataSource = new MatTableDataSource<ContractEnterprise>();
  selection = new SelectionModel<ContractEnterprise>(true, []);
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  _DialogOptions: {
    width: '80%';
  };
  loading: boolean = false;
  constructor(
    public _services: ContractEnterpriseService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    @Inject('SNACK_BAR_OPTIONS') private snackBarOptions,
    @Inject('DIALOG_OPTIONS') private dialogOptions
  ) {}

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.loading = true;
    this._services.select().subscribe(
      (res: any) => {
        this._services.items = res.data;
        this.dataSource.data = this._services.items;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        this.snackBarOptions.panelClass = ['danger'];
        this.snackBar.open('Cập nhật thành công!', null, this.snackBarOptions);
      },
      () => {
        this.loading = false;
      }
    );
  }
  handleAdd() {
    this._services.item = new ContractEnterprise();
    const dialogRef = this.dialog.open(UpdateComponent, this.dialogOptions);
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }
  handleEdit(item) {
    this._services.item = item;
    const dialogRef = this.dialog.open(UpdateComponent, this.dialogOptions);
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }
  handleDelete(item) {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.delete([item]);
      }
    });
  }
  handleDeleteAll() {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.delete(this.selection.selected);
      }
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
