import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FinancialReportEntry,
  FinancialReportIndividualEntry,
} from '../financial-report.model';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-financial-report-graphs',
  templateUrl: './financial-report-graphs.component.html',
  styleUrl: './financial-report-graphs.component.css',
})
export class FinancialReportGraphsComponent implements OnInit, OnChanges {
  @Input() entries!: FinancialReportEntry[];
  @Input() monthlyEntries!: FinancialReportIndividualEntry[];
  @ViewChild('chart') chart!: UIChart;
  revenueChartData: any;
  reservationsChartData: any;
  revenueMonthlyChartData: any;
  reservationsMonthlyChartData: any;

  ngOnInit() {
    this.revenueChartData = {
      labels: [],
      datasests: [
        {
          data: [],
        },
      ],
    };
    this.reservationsChartData = {
      labels: [],
      datasests: [
        {
          data: [],
        },
      ],
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.revenueChartData = this.getRevenueData();
    this.reservationsChartData = this.getReservationsData();
    this.revenueMonthlyChartData = this.getMonthlyRevenueData();
    this.reservationsMonthlyChartData = this.getMonthlyReservationsData();
  }

  getRevenueData(): any {
    return {
      labels: this.entries.map((entry) => entry.accommodationTitle),
      datasets: [
        {
          data: this.entries.map((entry) => entry.revenue),
        },
      ],
    };
  }

  getReservationsData(): any {
    return {
      labels: this.entries.map((entry) => entry.accommodationTitle),
      datasets: [
        {
          data: this.entries.map((entry) => entry.reservationCount),
        },
      ],
    };
  }

  getMonthlyRevenueData(): any {
    return {
      labels: this.monthlyEntries.map((entry) => entry.month),
      datasets: [
        {
          data: this.monthlyEntries.map((entry) => entry.revenue),
        },
      ],
    };
  }

  getMonthlyReservationsData(): any {
    return {
      labels: this.monthlyEntries.map((entry) => entry.month),
      datasets: [
        {
          data: this.monthlyEntries.map((entry) => entry.reservationCount),
        },
      ],
    };
  }

  getTotalRevenue(): number {
    return this.entries
      .map((entry) => entry.revenue)
      .reduce((acc, curr) => acc + curr);
  }

  getTotalReservations(): number {
    return this.entries
      .map((entry) => entry.reservationCount)
      .reduce((acc, curr) => acc + curr);
  }
}
