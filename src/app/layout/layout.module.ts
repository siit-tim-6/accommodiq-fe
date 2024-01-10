import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReviewModule } from '../review/review.module';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';

@NgModule({
  declarations: [
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    UpdateAccountComponent,
  ],
  imports: [CommonModule, FormsModule, RouterLink, ReviewModule, PrimengModule],
  exports: [
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    UpdateAccountComponent,
  ],
})
export class LayoutModule {}
