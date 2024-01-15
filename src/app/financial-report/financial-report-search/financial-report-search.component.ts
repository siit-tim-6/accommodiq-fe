import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-financial-report-search',
  templateUrl: './financial-report-search.component.html',
  styleUrl: './financial-report-search.component.css',
})
export class FinancialReportSearchComponent {
  @Output()
  onDateChange = new EventEmitter<Date[]>();

  @Output()
  exportToPdf = new EventEmitter<void>();

  dateRange: Date[] = [];

  constructor() {}

  dateChange() {
    if (this.isDateRangeValid()) this.onDateChange.emit(this.dateRange);
  }

  handleExportClick() {
    this.exportToPdf.emit();
  }

  private isDateRangeValid() {
    return (
      this.dateRange.length === 2 &&
      this.dateRange[0] != null &&
      this.dateRange[1] !== null
    );
  }
}
