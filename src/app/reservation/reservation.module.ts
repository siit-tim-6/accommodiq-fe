import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationCardComponent } from './reservation-card/reservation-card.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationSearchComponent } from './reservation-search/reservation-search.component';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    ReservationCardComponent,
    ReservationListComponent,
    ReservationSearchComponent,
  ],
  imports: [CommonModule, PrimengModule, FormsModule, GoogleMapsModule],
  exports: [ReservationListComponent],
})
export class ReservationModule {}