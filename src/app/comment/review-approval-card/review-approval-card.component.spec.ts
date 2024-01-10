import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewApprovalCardComponent } from './review-approval-card.component';

describe('PendingReviewCardComponent', () => {
  let component: ReviewApprovalCardComponent;
  let fixture: ComponentFixture<ReviewApprovalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewApprovalCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewApprovalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
