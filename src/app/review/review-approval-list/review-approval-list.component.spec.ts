import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewApprovalListComponent } from './review-approval-list.component';

describe('PendingReviewsComponent', () => {
  let component: ReviewApprovalListComponent;
  let fixture: ComponentFixture<ReviewApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewApprovalListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
