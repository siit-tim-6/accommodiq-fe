import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReviewCardComponent } from './pending-review-card.component';

describe('PendingReviewCardComponent', () => {
  let component: PendingReviewCardComponent;
  let fixture: ComponentFixture<PendingReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingReviewCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PendingReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
