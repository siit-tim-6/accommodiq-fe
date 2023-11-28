import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from "@angular/forms";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [NavBarComponent, LoginComponent, RegistrationComponent, UpdateAccountComponent],
  imports: [CommonModule, FormsModule, FaIconComponent, RouterLink],
  exports: [NavBarComponent, LoginComponent, RegistrationComponent, UpdateAccountComponent],
})
export class LayoutModule {}
