import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ServicesService } from '../../../shared/services/services.service';
import { Services } from '../../../shared/models/services.model';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  constructor(
    public _services: ServicesService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    public snackBar: MatSnackBar,
    @Inject('SNACK_BAR_OPTIONS') private snackBarOptions,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
    // this.item = this.data.item;
  }
  handleSubmit(form: NgForm) {
    if (form.valid) {
      if (this._services.item.group_id > 0) {
        this._services.update().subscribe(
          (rs: any) => {
            this.snackBarOptions.panelClass = [rs.message];
            this.snackBar.open(
              'Cập nhật thành công!',
              null,
              this.snackBarOptions
            );
          },
          error => {
            this.snackBarOptions.panelClass = ['danger'];
            this.snackBar.open(
              'Có lỗi trong quá trình xử lý, vui lòng thực hiện lại!',
              null,
              this.snackBarOptions
            );
          }
        );
      } else {
        this._services.insert().subscribe(
          (rs: any) => {
            this._services.item = new Services();
            this.snackBarOptions.panelClass = [rs.message];
            this.snackBar.open(
              'Thêm mới thành công',
              null,
              this.snackBarOptions
            );
          },
          error => {
            this.snackBarOptions.panelClass = ['danger'];
            this.snackBar.open(
              'Có lỗi trong quá trình xử lý, vui lòng thực hiện lại!',
              null,
              this.snackBarOptions
            );
          }
        );
      }
    }
  }
}
