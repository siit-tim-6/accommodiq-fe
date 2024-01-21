import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostReviewApprovalListComponent } from './host-review-approval-list.component';

describe('HostReviewApprovalListComponent', () => {
  let component: HostReviewApprovalListComponent;
  let fixture: ComponentFixture<HostReviewApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostReviewApprovalListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostReviewApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
