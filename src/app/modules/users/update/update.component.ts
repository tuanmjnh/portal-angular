import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UsersService } from '../../../shared/services/users.service';
import { Users } from '../../../shared/models/users.model';
import * as config from '../../../shared/helpers/config';
// import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  constructor(
    public _services: UsersService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    // private snackBar: SnackBarComponent,
    private snackBar: MatSnackBar,
    // @Inject('SNACK_BAR_OPTIONS') private snackBarOptions,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
    // this.item = this.data.item;
  }
  handleSubmit(form: NgForm) {
    if (form.valid) {
      if (this._services.item.user_id) {
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
              this._services.item = new Users();
              this.snackBar.open('Thêm mới thành công!', null, config.SNACK_BAR_SUCCESS);
            } else if (rs.message === 'exist') {
              this.snackBar.open('Key đã tồn tại!', null, config.SNACK_BAR_DANGER);
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
