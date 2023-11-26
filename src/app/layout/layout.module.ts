import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import {FormsModule} from "@angular/forms";
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NavBarComponent, UpdateAccountComponent],
    imports: [CommonModule, FormsModule, FaIconComponent],
  exports: [NavBarComponent, UpdateAccountComponent],
})
export class LayoutModule {}
