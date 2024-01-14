import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialReportGraphsComponent } from './financial-report-graphs.component';

describe('FinancialReportGraphsComponent', () => {
  let component: FinancialReportGraphsComponent;
  let fixture: ComponentFixture<FinancialReportGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialReportGraphsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialReportGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
