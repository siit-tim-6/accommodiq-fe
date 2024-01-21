import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSearchComponent } from './reservation-search.component';

describe('ReservationSearchComponent', () => {
  let component: ReservationSearchComponent;
  let fixture: ComponentFixture<ReservationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
