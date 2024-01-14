import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialReportSearchComponent } from './financial-report-search/financial-report-search.component';
import { FinancialReportCardComponent } from './financial-report-card/financial-report-card.component';
import { FinancialReportListComponent } from './financial-report-list/financial-report-list.component';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';

@NgModule({
  declarations: [
    FinancialReportSearchComponent,
    FinancialReportCardComponent,
    FinancialReportListComponent,
  ],
  imports: [CommonModule, FormsModule, PrimengModule],
  exports: [FinancialReportSearchComponent, FinancialReportCardComponent],
})
export class FinancialReportModule {}
