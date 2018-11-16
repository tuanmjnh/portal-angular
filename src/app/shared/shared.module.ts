import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule
} from '@angular/material';
// Components
import { ConfirmComponent } from './components/confirm/confirm.component';
import { DisplayFilesComponent } from './components/display-files/display-files.component';
import { UploadComponent } from './components/upload/upload.component';
@NgModule({
  imports: [CommonModule, MatDialogModule, MatTooltipModule, MatSnackBarModule],
  declarations: [ConfirmComponent, DisplayFilesComponent, UploadComponent],
  exports: [ConfirmComponent, DisplayFilesComponent, UploadComponent],
  entryComponents: [ConfirmComponent]
})
export class SharedModule {}
