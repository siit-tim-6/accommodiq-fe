import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommentModule } from '../comment/comment.module';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';
import { ReportFormComponent } from './report-form/report-form.component';

@NgModule({
  declarations: [
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    UpdateAccountComponent,
    ReportFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CommentModule,
    PrimengModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    UpdateAccountComponent,
  ],
})
export class LayoutModule {}
