import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationSearchComponent } from './accommodation-search/accommodation-search.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';

@NgModule({
  declarations: [
    AccommodationSearchComponent,
    AccommodationCardComponent,
    AccommodationListComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    RatingModule,
  ],
  exports: [
    AccommodationSearchComponent,
    AccommodationCardComponent,
    AccommodationListComponent,
  ],
})
export class AccommodationModule {}
