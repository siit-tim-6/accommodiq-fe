import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccountInfoComponent } from './account-info/account-info.component';

@NgModule({
  declarations: [
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    UpdateAccountComponent,
    AccountInfoComponent,
  ],
  imports: [CommonModule, FormsModule, RouterLink],
  exports: [
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    UpdateAccountComponent,
    AccountInfoComponent,
  ],
})
export class LayoutModule {}
