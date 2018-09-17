import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ServicesService } from '../../../shared/services/services.service';
import { Services } from '../../../shared/models/services.model';
import * as config from '../../../shared/helpers/config';
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
            if (rs.message === 'success')
              this.snackBar.open('Cập nhật thành công!', null, config.SNACK_BAR_SUCCESS);
            else this.snackBar.open('Lỗi dữ liệu, vui lòng thực hiện lại!', null, config.SNACK_BAR_DANGER);
          },
          error => {
            this.snackBar.open('Không thể kết nối đến server!', null, config.SNACK_BAR_DANGER);
          }
        );
      } else {
        this._services.insert().subscribe(
          (rs: any) => {
            if (rs.message === 'success') {
              this._services.item = new Services();
              this.snackBar.open('Thêm mới thành công!', null, config.SNACK_BAR_SUCCESS);
            } else this.snackBar.open('Lỗi dữ liệu, vui lòng thực hiện lại!', null, config.SNACK_BAR_DANGER);
          },
          error => {
            this.snackBar.open('Không thể kết nối đến server!', null, config.SNACK_BAR_DANGER);
          }
        );
      }
    }
  }
}
