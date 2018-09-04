import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../plugins/material.module';
// import { LanguagesRoutingModule } from './languages-routing.module';
// import { RecentSubmissionsComponent } from './recent-submissions/recent-submissions.component';
// import { NewSubmissionComponent } from './new-submission/new-submission.component';
// import { SharedModule } from '../../shared/shared.module';
import { LanguagesService } from '@/../../src/app/shared/services/languages.service';
// Components
import { LanguagesComponent } from './languages.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
// Routes
const routes: Routes = [
  {
    path: '',
    component: LanguagesComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
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
    RouterModule.forChild(routes)
    // LanguagesRoutingModule,
    // SharedModule
  ],
  providers: [LanguagesService],
  declarations: [LanguagesComponent, ListComponent, UpdateComponent] // FormComponent, RecentSubmissionsComponent, NewSubmissionComponent
})
export class LanguagesModule {}
