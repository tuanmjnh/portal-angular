import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app.routing';
import { AppComponent } from './app.component';
// Plugins
// import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './plugins/material.module';
// Themes
import { MaterialComponent } from './themes/material/material.component';
// Auth Component
import { AuthComponent } from './modules/auth/auth.component';

@NgModule({
  declarations: [AppComponent, routingComponents, MaterialComponent, AuthComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    // HttpModule,
    HttpClientModule,
    AppRoutingModule,
    // FlexLayoutModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
