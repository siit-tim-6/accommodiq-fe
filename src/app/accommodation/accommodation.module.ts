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
import { FormsModule } from '@angular/forms';
import { HostsAccommodationListComponent } from './hosts-accommodation-list/hosts-accommodation-list.component';
import { DockModule } from 'primeng/dock';
import { DialogModule } from 'primeng/dialog';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AdminReviewListComponent } from './admin-review-list/admin-review-list.component';

@NgModule({
  declarations: [
    AccommodationSearchComponent,
    AccommodationCardComponent,
    AccommodationListComponent,
    AccommodationDetailsComponent,
    HostsAccommodationListComponent,
    AccommodationCreateComponent,
    AdminReviewListComponent,
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
    DockModule,
    InputTextareaModule,
  ],
  exports: [
    AccommodationSearchComponent,
    AccommodationCardComponent,
    AccommodationListComponent,
  ],
})
export class AccommodationModule {}
