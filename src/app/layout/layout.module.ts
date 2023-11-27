import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule} from "@angular/forms";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {AccountInfoComponent} from "./account-info/account-info.component";

@NgModule({
  declarations: [NavBarComponent, LoginComponent, RegistrationComponent, AccountInfoComponent],
  imports: [CommonModule, FormsModule, FaIconComponent, RouterLink],
  exports: [NavBarComponent, LoginComponent, RegistrationComponent, AccountInfoComponent],
})
export class LayoutModule {}
