import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation.model';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit {
  elements: Reservation[] = [];

  constructor(private service: ReservationService) {}

  ngOnInit(): void {
    this.service.findByFilter().subscribe((reservations) => {
      this.elements = reservations;
    });
  }
}
