import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ContractEnterpriseService } from '../../../shared/services/contract-enterprise.service';
import { ContractEnterprise } from '../../../shared/models/contract-enterprise.model';
import { ServicesService } from '../../../shared/services/services.service';
import { Services } from '../../../shared/models/services.model';
import { RemoveChars } from '../../../shared/helpers/common';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  groups: Services[];
  uploadConfig: any = {
    files: new Array(),
    multiple: false,
    button: 'Chọn file hợp đồng (.pdf)',
    extensions: ['pdf'],
    fieldName: 'fileUpload',
    controller: 'filemanager',
    renameFile: this._services.item.contract_code,
    httpOptions: this._services.options,
    baseUrl: this._services.baseUrl + 'api/'
  };
  minDate: Date = new Date();
  constructor(
    public _services: ContractEnterpriseService,
    public _servicesService: ServicesService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    public snackBar: MatSnackBar,
    @Inject('SNACK_BAR_OPTIONS') private snackBarOptions
  ) {}

  ngOnInit() {
    this._servicesService.app_key = 'dvcntt';
    this._servicesService.query.flag = 1;
    this._servicesService.select().subscribe((res: any) => {
      this.groups = res.data;
    });
    // this.item = this.data.item;
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.uploadConfig.files.length > 0) {
        const file = this.uploadConfig.files[0];
        this._services.item.attach = file.full_name;
        this._services.item.app_key = 'create';
        this._services.item.local_id = 1;
        if (this._services.item.contract_enterprise_id) {
          this._services.update().subscribe(
            (res: any) => {
              this.snackBarOptions.panelClass = [res.message];
              this.snackBar.open(
                'Cập nhật thành công!',
                null,
                this.snackBarOptions
              );
              this.uploadConfig.files = new Array();
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
            (res: any) => {
              this._services.item = new ContractEnterprise();
              this.snackBarOptions.panelClass = [res.message];
              this.snackBar.open(
                'Thêm mới thành công',
                null,
                this.snackBarOptions
              );
              this.uploadConfig.files = new Array();
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
  onChangeStartAt(event: MatDatepickerInputEvent<Date>) {
    this._services.item.start_at = event.value;
  }
  onChangeEndAt(event: MatDatepickerInputEvent<Date>) {
    this._services.item.end_at = event.value;
  }
  onUpdateFileUpload() {
    this.uploadConfig.renameFile = RemoveChars(
      this._services.item.contract_code
    );
  }
}
