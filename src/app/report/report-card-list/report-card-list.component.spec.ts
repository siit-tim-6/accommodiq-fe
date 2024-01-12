import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCardListComponent } from './report-card-list.component';

describe('ReportCardListComponent', () => {
  let component: ReportCardListComponent;
  let fixture: ComponentFixture<ReportCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportCardListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
