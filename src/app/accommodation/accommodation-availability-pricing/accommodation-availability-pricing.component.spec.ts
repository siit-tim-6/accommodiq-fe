import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationAvailabilityPricingComponent } from './accommodation-availability-pricing.component';

describe('AccommodationAvailabilityPricingComponent', () => {
  let component: AccommodationAvailabilityPricingComponent;
  let fixture: ComponentFixture<AccommodationAvailabilityPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationAvailabilityPricingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      AccommodationAvailabilityPricingComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
