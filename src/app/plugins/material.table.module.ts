import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatTableModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatSortModule,
  MatPaginatorModule,
  MatSelectModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [],
  exports: [
    // CdkTableModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class MaterialTableModule {}
