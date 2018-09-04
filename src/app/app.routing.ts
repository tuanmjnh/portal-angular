import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// AppPreloader
import { AppPreloader } from './app.preloader';
// Modules
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AuthComponent } from './modules/auth/auth.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'languages',
    loadChildren: './modules/languages/languages.module#LanguagesModule',
    data: { preload: false }
  },
  {
    path: 'modules',
    loadChildren: './modules/modules/modules.module#ModulesModule',
    data: { preload: false }
  },
  {
    path: 'services',
    loadChildren: './modules/services/main.module#MainModule',
    data: { preload: false }
  },
  {
    path: 'contract-enterprise',
    loadChildren: './modules/contract-enterprise/main.module#MainModule',
    data: { preload: false }
  },
  {
    path: 'transfer-data',
    loadChildren: './modules/transfer-data/transfer-data.module#TransferDataModule',
    data: { preload: false }
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { preloadingStrategy: AppPreloader } // Using our own custom preloader
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  providers: [AppPreloader]
})
export class AppRoutingModule {}
export const routingComponents = [
  NotFoundComponent,
  AuthComponent,
  DashboardComponent
];
