import { Component, OnInit, Input } from '@angular/core';
import {
  isImage,
  isAudio,
  isVideo,
  isPdf
} from '@/../../src/app/shared/helpers/common';
@Component({
  selector: 'app-display-files',
  templateUrl: './display-files.component.html',
  styleUrls: ['./display-files.component.scss']
})
export class DisplayFilesComponent implements OnInit {
  @Input('config')
  config: any;
  constructor() {}

  ngOnInit() {}
  getExtension(extension) {
    if (isImage(extension)) return 'image';
    else if (isAudio(extension)) return 'audio';
    else if (isVideo(extension)) return 'video';
    else if (isPdf(extension)) return 'pdf';
    else return 'file';
  }
}
