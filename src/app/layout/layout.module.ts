import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [NavBarComponent, LoginComponent],
  imports: [CommonModule, FormsModule],
  exports: [NavBarComponent, LoginComponent],
})
export class LayoutModule {}
