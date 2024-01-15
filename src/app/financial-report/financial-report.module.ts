import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialReportSearchComponent } from './financial-report-search/financial-report-search.component';
import { FinancialReportCardComponent } from './financial-report-card/financial-report-card.component';
import { FinancialReportListComponent } from './financial-report-list/financial-report-list.component';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';
import { FinancialReportGraphsComponent } from './financial-report-graphs/financial-report-graphs.component';
import { FinancialReportIndividualComponent } from './financial-report-individual/financial-report-individual.component';

@NgModule({
  declarations: [
    FinancialReportSearchComponent,
    FinancialReportCardComponent,
    FinancialReportListComponent,
    FinancialReportGraphsComponent,
    FinancialReportIndividualComponent,
  ],
  imports: [CommonModule, FormsModule, PrimengModule],
  exports: [FinancialReportSearchComponent, FinancialReportCardComponent],
})
export class FinancialReportModule {}
