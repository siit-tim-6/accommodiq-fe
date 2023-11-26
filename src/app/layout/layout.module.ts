import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UpdateAccountComponent } from './update-account/update-account.component';

@NgModule({
  declarations: [NavBarComponent, UpdateAccountComponent],
  imports: [CommonModule],
  exports: [NavBarComponent, UpdateAccountComponent],
})
export class LayoutModule {}
