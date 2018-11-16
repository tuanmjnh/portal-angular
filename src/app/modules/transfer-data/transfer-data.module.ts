import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../plugins/material.module';
// Service
import { TransferDataService } from './shared/transfer-data.service';
// Components
import { TransferDataComponent } from './transfer-data.component';
// Routes
const routes: Routes = [
  {
    path: '',
    component: TransferDataComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [TransferDataService],
  declarations: [TransferDataComponent]
})
export class TransferDataModule {}
