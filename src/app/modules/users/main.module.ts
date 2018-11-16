import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../plugins/material.module';
import { InputTrimModule } from 'ng2-trim-directive';
// Shared
import { SharedModule } from '../../shared/shared.module';
// Service
// import { ModulesService } from '../../shared/services/modules.service';
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
    InputTrimModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  // providers: [ModulesService],
  declarations: [MainComponent, ListComponent, UpdateComponent]
})
export class MainModule {}
