import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AccountInfoComponent } from './layout/account-info/account-info.component';

@NgModule({
  declarations: [AppComponent, AccountInfoComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
