import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationCreateComponent } from './accommodation-create.component';

describe('CreateApartmentComponent', () => {
  let component: AccommodationCreateComponent;
  let fixture: ComponentFixture<AccommodationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccommodationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
