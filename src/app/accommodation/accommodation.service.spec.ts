import { TestBed } from '@angular/core/testing';

import { AccommodationService } from './accommodation.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  availabilityMock,
  reservationMock,
  totalPriceMock,
} from '../mocks/accommodation.service.mock';

describe('AccommodationService', () => {
  let service: AccommodationService;
  let httpContoller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AccommodationService);
    httpContoller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch accommodation availability', () => {
    service.getIsAvailable(1, 1, 2).subscribe((availability) => {
      expect(availability).toEqual(availabilityMock);
    });

    const req = httpContoller.expectOne({
      method: 'GET',
      url: 'http://localhost:8000/accommodations/1/is-available?dateFrom=1&dateTo=2',
    });

    req.flush(availabilityMock);
  });

  it('should fetch accommodation total price', () => {
    service.getTotalPrice(1, 1, 2, 2).subscribe((totalPrice) => {
      expect(totalPrice).toEqual(totalPriceMock);
    });

    const req = httpContoller.expectOne({
      method: 'GET',
      url: 'http://localhost:8000/accommodations/1/total-price?dateFrom=1&dateTo=2&guests=2',
    });

    req.flush(totalPriceMock);
  });

  it('should create a new reservation', () => {
    service.createReservation(reservationMock).subscribe((reservation) => {
      expect(reservation).toEqual(reservationMock);
    });

    const req = httpContoller.expectOne({
      method: 'POST',
      url: 'http://localhost:8000/guests/reservations',
    });

    req.flush(reservationMock);
  });
});
