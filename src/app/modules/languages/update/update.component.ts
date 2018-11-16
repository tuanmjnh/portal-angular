import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup } from '@angular/forms';
import { LanguagesService } from '@/../../src/app/shared/services/languages.service';
import { Languages } from '@/../../src/app/shared/models/languages.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  routerPath = {};
  constructor(
    public languagesService: LanguagesService,
    private router: Router
  ) {}
  id: any;
  ngOnInit() {
    // if (this.languagesService.item && this.languagesService.item.id) {
    //   this.id = this.languagesService.item.id;
    //   this.languagesService
    //     .selectById(this.languagesService.item.id)
    //     .subscribe(data => {
    //       this.languagesService.item = data;
    //     });
    // } else this.id = null;
  }
  onUpdate(formData: NgForm) {
    if (formData.valid) {
      if (this.id) {
        this.languagesService.update(this.id, formData.value);
        // this.toastr.success('update sucessfull!');
      } else {
        this.languagesService.insert(formData.value);
        this.languagesService.item = new Languages();
        // this.toastr.success('insert sucessfull!');
      }
    } else {
      // this.toastr.error('form invalid!');
    }
  }
  onCancel() {
    this.router.navigate([
      '/',
      this.languagesService.router.path,
      this.languagesService.router.list
    ]);
    this.languagesService.item = new Languages();
    console.log(this.languagesService.item);
  }
  resetForm(formData?: NgForm) {
    // console.log(formData.invalid);
    // if (formData != null) formData.reset();
    // else this.item = new Languages();
    formData.reset();
    // Object.keys(formData.controls).forEach(key => {
    //   formData.controls[key].setErrors(null)
    // });
  }
}
