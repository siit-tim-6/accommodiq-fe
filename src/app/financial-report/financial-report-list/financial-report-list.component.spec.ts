import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialReportListComponent } from './financial-report-list.component';

describe('FinancialReportListComponent', () => {
  let component: FinancialReportListComponent;
  let fixture: ComponentFixture<FinancialReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialReportListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
