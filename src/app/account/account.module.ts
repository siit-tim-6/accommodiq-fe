import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { CommentModule } from '../review/comment.module';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';

@NgModule({
  declarations: [AccountInfoComponent, ProfileAccountComponent],
  imports: [CommonModule, CommentModule, PrimengModule],
  exports: [AccountInfoComponent, ProfileAccountComponent],
})
export class AccountModule {}
