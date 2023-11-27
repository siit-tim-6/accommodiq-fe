import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { CreateApartmentComponent } from './create-apartment/create-apartment.component';

@NgModule({
  declarations: [AppComponent, CreateApartmentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    AccommodationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
