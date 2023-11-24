import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [NavBarComponent, LoginComponent],
  imports: [CommonModule],
  exports: [NavBarComponent, LoginComponent],
})
export class LayoutModule {}
