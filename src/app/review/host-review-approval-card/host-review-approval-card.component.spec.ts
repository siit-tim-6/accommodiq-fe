import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostReviewApprovalCardComponent } from './host-review-approval-card.component';

describe('HostReviewApprovalCardComponent', () => {
  let component: HostReviewApprovalCardComponent;
  let fixture: ComponentFixture<HostReviewApprovalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostReviewApprovalCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostReviewApprovalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
