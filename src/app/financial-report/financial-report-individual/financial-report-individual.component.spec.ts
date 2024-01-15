import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialReportIndividualComponent } from './financial-report-individual.component';

describe('FinancialReportIndividualComponent', () => {
  let component: FinancialReportIndividualComponent;
  let fixture: ComponentFixture<FinancialReportIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialReportIndividualComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialReportIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
