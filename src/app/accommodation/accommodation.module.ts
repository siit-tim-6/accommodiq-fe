import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccommodationSearchComponent } from './accommodation-search/accommodation-search.component';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { CommentModule } from '../comment/comment.module';
import { HostsAccommodationListComponent } from './hosts-accommodation-list/hosts-accommodation-list.component';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';
import { AdminReviewListComponent } from './admin-review-list/admin-review-list.component';
import { AccommodationAvailabilityPricingComponent } from './accommodation-availability-pricing/accommodation-availability-pricing.component';
import { AccommodationUpdateComponent } from './accommodation-update/accommodation-update.component';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';
import { GmapsModule } from '../infrastructure/gmaps/gmaps.module';

@NgModule({
  declarations: [
    AccommodationSearchComponent,
    AccommodationCardComponent,
    AccommodationListComponent,
    AccommodationDetailsComponent,
    HostsAccommodationListComponent,
    AccommodationCreateComponent,
    AdminReviewListComponent,
    AccommodationUpdateComponent,
    AccommodationAvailabilityPricingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CommentModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    GmapsModule,
  ],
  exports: [
    AccommodationSearchComponent,
    AccommodationListComponent,
    AccommodationDetailsComponent,
    HostsAccommodationListComponent,
    AccommodationCreateComponent,
    AdminReviewListComponent,
    AccommodationUpdateComponent,
    AccommodationAvailabilityPricingComponent,
  ],
})
export class AccommodationModule {}
