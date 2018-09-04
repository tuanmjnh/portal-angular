import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Guid,
  CheckExtension,
  getExtension
} from '@/../../src/app/shared/helpers/common';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input('config')
  config: any;
  @ViewChild('fileUploadInput')
  fileUploadInput: ElementRef;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.files = new Array();
  }
  handleFilesChange(event) {
    const files = event.target.files;
    const formData = new FormData();
    Array.from(Array(files.length).keys()).map(x => {
      let tmp: any;
      if (this.config.multiple) {
        tmp = {
          fieldName: this.config.fieldName,
          fileName:
            this.config.renameFile === true
              ? Guid() + getExtension(files[x].name)
              : files[x].name,
          file: files[x]
        };
      } else {
        tmp = {
          fieldName: this.config.fieldName,
          fileName: this.config.renameFile
            ? this.config.renameFile + getExtension(files[x].name)
            : files[x].name,
          file: files[x]
        };
      }
      formData.append(tmp.fieldName, tmp.file, tmp.fileName);
      this.config.files.push(tmp);
    });
    this.http
      .post(
        this.config.baseUrl + this.config.controller,
        formData,
        this.config.httpOptions
      )
      .subscribe((res: any) => {
        this.config.files = res.files;
        this.fileUploadInput.nativeElement.value = '';
        console.log(res);
      });
  }
}
