import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../plugins/material.module';
// Shared
import { SharedModule } from '../../shared/shared.module';
// Service
import { ContractEnterpriseService } from '../../shared/services/contract-enterprise.service';
// Components
import { MainComponent } from './main.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
// Routes
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      // { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '', component: ListComponent },
      { path: 'list', component: ListComponent },
      { path: 'update', component: UpdateComponent }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [ContractEnterpriseService],
  declarations: [MainComponent, ListComponent, UpdateComponent]
})
export class MainModule {}
