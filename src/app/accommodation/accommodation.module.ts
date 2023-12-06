import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationSearchComponent } from './accommodation-search/accommodation-search.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { RouterModule } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { CommentModule } from '../comment/comment.module';
import { HostsAccommodationListComponent } from './hosts-accommodation-list/hosts-accommodation-list.component';
import {DialogModule} from "primeng/dialog";
import {AccommodationCreateComponent} from "./accommodation-create/accommodation-create.component";
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {FileUploadModule} from "primeng/fileupload";
import {DropdownModule} from "primeng/dropdown";
import {TableModule} from "primeng/table";
import {InputTextareaModule} from "primeng/inputtextarea";

@NgModule({
  declarations: [
    AccommodationSearchComponent,
    AccommodationCardComponent,
    AccommodationListComponent,
    AccommodationDetailsComponent,
    HostsAccommodationListComponent,
    AccommodationCreateComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    RatingModule,
    RouterModule,
    GalleriaModule,
    CommentModule,
    FormsModule,
    DialogModule,
    CheckboxModule,
    FileUploadModule,
    DropdownModule,
    TableModule,
    InputTextareaModule,
  ],
  exports: [
    AccommodationSearchComponent,
    AccommodationCardComponent,
    AccommodationListComponent,
  ],
})
export class AccommodationModule {}
