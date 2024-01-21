import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialReportSearchComponent } from './financial-report-search.component';

describe('FinancialReportSearchComponent', () => {
  let component: FinancialReportSearchComponent;
  let fixture: ComponentFixture<FinancialReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialReportSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
