import { Component, OnInit } from '@angular/core';
import { FinancialReportService } from '../financial-report.service';
import { FinancialReportEntry } from '../financial-report.model';
import { getTimestampMiliseconds } from '../../utils/date.utils';

@Component({
  selector: 'app-financial-report-list',
  templateUrl: './financial-report-list.component.html',
  styleUrl: './financial-report-list.component.css',
})
export class FinancialReportListComponent {
  entries: FinancialReportEntry[] = [];
  dateChangeTriggered = false;

  constructor(private service: FinancialReportService) {}

  handleDateChange(dateRange: Date[]) {
    this.dateChangeTriggered = true;
    this.service
      .getAllEntries(
        getTimestampMiliseconds(dateRange[0]),
        getTimestampMiliseconds(dateRange[1]),
      )
      .subscribe((entries) => {
        this.entries = entries;
      });
  }
}
