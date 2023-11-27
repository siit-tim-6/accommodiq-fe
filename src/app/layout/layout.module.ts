import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [NavBarComponent, LoginComponent],
  imports: [CommonModule, FormsModule, FaIconComponent],
  exports: [NavBarComponent, LoginComponent],
})
export class LayoutModule {}
