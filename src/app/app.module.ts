import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationModule } from './accommodation/accommodation.module';
import { AccommodationCreateComponent } from './accommodation/accommodation-create/accommodation-create.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {FileUploadModule} from "primeng/fileupload";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [AppComponent, AccommodationCreateComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    AccommodationModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    CheckboxModule,
    FileUploadModule,
    InputNumberModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
