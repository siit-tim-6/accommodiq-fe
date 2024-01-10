import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReviewListComponent } from './pending-review-list.component';

describe('PendingReviewsComponent', () => {
  let component: PendingReviewListComponent;
  let fixture: ComponentFixture<PendingReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingReviewListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PendingReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
