import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewListComponent } from './admin-review-list.component';

describe('AdminReviewListComponent', () => {
  let component: AdminReviewListComponent;
  let fixture: ComponentFixture<AdminReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminReviewListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
