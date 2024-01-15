import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialReportCardComponent } from './financial-report-card.component';

describe('FinancialReportCardComponent', () => {
  let component: FinancialReportCardComponent;
  let fixture: ComponentFixture<FinancialReportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialReportCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
