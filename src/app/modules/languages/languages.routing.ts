import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'update', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguagesRoutingModule {}
// export const routingComponents = [
//     ListComponent,
//     UpdateComponent
// ];
