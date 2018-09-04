import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(
    public _services: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
    @Inject('SNACK_BAR_OPTIONS') private snackBarOptions
  ) {}

  ngOnInit() {}
  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.snackBarOptions.panelClass = ['danger'];
      this._services.Login().subscribe(
        (res: any) => {
          // Không tồn tại tài khoản
          if (res.message === 'null')
            this.snackBar.open(
              'Tài khoản hoặc mật khẩu không đúng!',
              null,
              this.snackBarOptions
            );
          // Không đúng mật khẩu
          else if (res.message === 'false')
            this.snackBar.open(
              'Tài khoản hoặc mật khẩu không đúng!',
              null,
              this.snackBarOptions
            );
          // Tài khoản đã khóa
          else if (res.message === 'locked')
            this.snackBar.open(
              'Tài khoản hoặc mật khẩu không đúng!',
              null,
              this.snackBarOptions
            );
          else if (res.message === 'success') {
            this._services.SetStorage(res.token);
            this._services.roles = res.roles;
            this.router.navigate(['user']);
          } else
            this.snackBar.open(
              'Lỗi không thể đăng nhập, vui lòng thực hiện lại!',
              null,
              this.snackBarOptions
            );
        },
        error => {
          this.snackBar.open(
            'Tài khoản hoặc mật khẩu không đúng!',
            null,
            this.snackBarOptions
          );
        }
      );
    }
  }
}
