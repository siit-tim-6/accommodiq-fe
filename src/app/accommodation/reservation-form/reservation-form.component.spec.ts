import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFormComponent } from './reservation-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { AccommodationService } from '../accommodation.service';
import { AccommodationServiceMock } from '../../mocks/accommodation.service.mock';

describe('ReservationFormComponent', () => {
  let component: ReservationFormComponent;
  let fixture: ComponentFixture<ReservationFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ReservationFormComponent],
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule],
      providers: [
        { provide: AccommodationService, useClass: AccommodationServiceMock },
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationFormComponent);
    component = fixture.debugElement.componentInstance;

    component.accommodationId = 1;
    component.minGuests = 1;
    component.maxGuests = 3;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make make-reservations button disabled by default', () => {
    const button = fixture.debugElement.query(By.css('#make-reservation-btn'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the button when all fields are valid', () => {
    component.guests = 2;
    component.rangeDates = [new Date(), new Date()];

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#make-reservation-btn'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should disable the button when guests field is not inside provided range', () => {
    component.guests = 0;
    component.rangeDates = [new Date(), new Date()];

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#make-reservation-btn'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should disable the button when guests field is not of type number', () => {
    component.guests = 'aaa';
    component.rangeDates = [new Date(), new Date()];

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#make-reservation-btn'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should disable the button when rangeDates field is invalid', () => {
    component.guests = 2;
    component.rangeDates = [];

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#make-reservation-btn'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should call guestsChange on change', () => {
    spyOn(component, 'guestsChange');

    component.guests = 2;

    fixture.detectChanges();

    const guestsInput = fixture.debugElement.query(By.css('#guests-input'));
    guestsInput.nativeElement.dispatchEvent(new Event('change'));

    expect(component.guestsChange).toHaveBeenCalled();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.totalPrice).toEqual(200);
      const totalPriceP = fixture.debugElement.query(By.css('#total-price'));
      expect(totalPriceP.nativeElement.innerText).toEqual('€200 EUR total');
    });
  });

  it('should call calendarBlur on blur', () => {
    spyOn(component, 'calendarBlur');

    const calendar = fixture.debugElement.query(By.css('#calendar-input'));
    calendar.nativeElement.dispatchEvent(new Event('onBlur'));

    expect(component.calendarBlur).toHaveBeenCalled();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.isAvailable).toBeTrue();
    });
  });

  it('should call makeReservation when the button is clicked', () => {
    const accommodationService =
      fixture.debugElement.injector.get(AccommodationService);
    spyOn(accommodationService, 'createReservation');
    spyOn(component, 'makeReservation');

    component.guests = 2;
    component.rangeDates = [new Date(), new Date()];

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#make-reservation-btn'));
    button.nativeElement.dispatchEvent(new Event('onClick'));

    expect(button.nativeElement.disabled).toBeFalsy();
    expect(component.makeReservation).toHaveBeenCalled();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(accommodationService.createReservation).toHaveBeenCalled();
    });
  });
});
