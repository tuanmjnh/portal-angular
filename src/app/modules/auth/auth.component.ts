import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../shared/services/auth.service';
import * as config from '../../shared/helpers/config';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loading: boolean = false;
  constructor(
    public _services: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit() {}
  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.loading = true;
      this._services.Login().subscribe(
        (res: any) => {
          // Không tồn tại tài khoản
          if (res.message === 'null')
            this.snackBar.open('Tài khoản hoặc mật khẩu không đúng!', null, config.SNACK_BAR_DANGER);
          // Không đúng mật khẩu
          else if (res.message === 'false')
            this.snackBar.open('Tài khoản hoặc mật khẩu không đúng!', null, config.SNACK_BAR_DANGER);
          // Tài khoản đã khóa
          else if (res.message === 'locked')
            this.snackBar.open('Tài khoản hoặc mật khẩu không đúng!', null, config.SNACK_BAR_DANGER);
          else if (res.message === 'success') {
            this._services.SetStorage(res.token);
            this._services.roles = res.roles;
            this.router.navigate(['user']);
          } else
            this.snackBar.open('Lỗi không thể đăng nhập, vui lòng thực hiện lại!', null, config.SNACK_BAR_DANGER);
          this.loading = false;
        },
        error => {
          this.snackBar.open('Lỗi kết nối đến máy chủ!', null, config.SNACK_BAR_DANGER);
          this.loading = false;
        }
      );
    }
  }
}
