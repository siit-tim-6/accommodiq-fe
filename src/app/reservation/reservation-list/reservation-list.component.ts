import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation.model';
import { ReservationService } from '../reservation.service';
import { GmapsService } from '../../services/gmaps.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit {
  elements: Reservation[] = [];
  apiLoaded: boolean = false;

  constructor(
    private service: ReservationService,
    private gmaps: GmapsService,
  ) {}

  ngOnInit(): void {
    this.service.findByFilter().subscribe((reservations) => {
      this.elements = reservations;
    });
    this.gmaps.apiLoaded$.subscribe((loaded) => {
      if (!loaded) {
        this.gmaps.loadMaps();
      }
      this.apiLoaded = loaded;
    });
  }
}
