import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { CommentModule } from '../comment/comment.module';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';

@NgModule({
  declarations: [
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    UpdateAccountComponent,
    AccountInfoComponent,
    ProfileAccountComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CommentModule,
    PrimengModule,
  ],
  exports: [
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    UpdateAccountComponent,
    AccountInfoComponent,
  ],
})
export class LayoutModule {}
