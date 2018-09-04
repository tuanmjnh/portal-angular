import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
// Themes Component
import { ThemesComponent } from './themes.component';
// Children Component
import { NavbarComponent } from "./bootstrap/navbar/navbar.component";
import { ToolbarComponent } from "./bootstrap/toolbar/toolbar.component";
import { FooterComponent } from "./bootstrap/footer/footer.component";

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [],
  // declarations: [ThemesComponent, NavbarComponent, ToolbarComponent, FooterComponent]
})
export class ThemesModule {}

export const ThemesComponents = [
  NavbarComponent,
  ToolbarComponent,
  FooterComponent
];
