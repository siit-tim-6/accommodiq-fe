import { Component, OnInit } from '@angular/core';
import { FinancialReportService } from '../financial-report.service';
import {
  AccommodationTitle,
  FinancialReportIndividualEntry,
} from '../financial-report.model';

@Component({
  selector: 'app-financial-report-individual',
  templateUrl: './financial-report-individual.component.html',
  styleUrl: './financial-report-individual.component.css',
})
export class FinancialReportIndividualComponent implements OnInit {
  accommodationTitles: AccommodationTitle[] = [];
  selectedAccommodation: AccommodationTitle | null = null;
  selectedYear: Date | null = null;
  entries: FinancialReportIndividualEntry[] = [];

  constructor(private service: FinancialReportService) {}

  ngOnInit(): void {
    this.service.getTitles().subscribe((elems) => {
      this.accommodationTitles = elems;
    });
  }

  handleInputChange(): void {
    if (this.selectedAccommodation != null && this.selectedYear != null) {
      this.service
        .getAccommodationYearlyReport(
          this.selectedAccommodation.id,
          this.selectedYear.getFullYear(),
        )
        .subscribe((entries) => {
          this.entries = entries;
        });
    }
  }
}
