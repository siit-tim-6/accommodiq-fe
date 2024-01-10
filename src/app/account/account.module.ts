import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { ReviewModule } from '../review/review.module';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';

@NgModule({
  declarations: [AccountInfoComponent, ProfileAccountComponent],
  imports: [CommonModule, ReviewModule, PrimengModule],
  exports: [AccountInfoComponent, ProfileAccountComponent],
})
export class AccountModule {}
