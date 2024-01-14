import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialReportSearchComponent } from './financial-report-search/financial-report-search.component';
import { FinancialReportCardComponent } from './financial-report-card/financial-report-card.component';
import { FinancialReportListComponent } from './financial-report-list/financial-report-list.component';

@NgModule({
  declarations: [
    FinancialReportSearchComponent,
    FinancialReportCardComponent,
    FinancialReportListComponent,
  ],
  imports: [CommonModule],
})
export class FinancialReportModule {}
