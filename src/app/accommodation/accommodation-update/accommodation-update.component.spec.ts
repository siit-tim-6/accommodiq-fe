import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationUpdateComponent } from './accommodation-update.component';

describe('AccommodationUpdateComponent', () => {
  let component: AccommodationUpdateComponent;
  let fixture: ComponentFixture<AccommodationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
