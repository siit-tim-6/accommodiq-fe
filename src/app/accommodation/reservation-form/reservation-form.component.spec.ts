import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFormComponent } from './reservation-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { AccommodationService } from '../accommodation.service';
import {
  AccommodationServiceMock,
  availabilityMock,
  totalPriceMock,
} from '../../mocks/accommodation.service.mock';
import { of } from 'rxjs';

describe('ReservationFormComponent', () => {
  let component: ReservationFormComponent;
  let fixture: ComponentFixture<ReservationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationFormComponent],
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule],
      // providers: [
      //   { provide: AccommodationService, useClass: AccommodationServiceMock },
      // ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationFormComponent);
    component = fixture.componentInstance;
    component.accommodationId = 1;
    component.minGuests = 1;
    component.maxGuests = 3;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('make reservations button should be disabled by default', () => {
    const button = fixture.debugElement.query(By.css('#make-reservation-btn'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable button when all fields are valid', () => {
    component.guests = 2;
    component.rangeDates = [new Date(), new Date()];

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#make-reservation-btn'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should call guest on change and fetch total price after that', () => {
    spyOn(component, 'guestsChange');

    const guestsInput = fixture.debugElement.query(By.css('#guests-input'));
    guestsInput.nativeElement.dispatchEvent(new Event('change'));

    expect(component.guestsChange).toHaveBeenCalled();
    const quoteService =
      fixture.debugElement.injector.get(AccommodationService);
    let spy = spyOn(quoteService, 'getTotalPrice').and.returnValue(
      of(totalPriceMock),
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.totalPrice).toEqual(totalPriceMock.totalPrice);
    });
  });

  it('expect calendar blur to be called', () => {
    spyOn(component, 'calendarBlur');

    const calendar = fixture.debugElement.query(By.css('#calendar-input'));
    calendar.nativeElement.dispatchEvent(new Event('blur'));

    expect(component.calendarBlur).toHaveBeenCalled();
  });
});
