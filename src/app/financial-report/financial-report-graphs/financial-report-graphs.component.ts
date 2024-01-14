import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FinancialReportEntry } from '../financial-report.model';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-financial-report-graphs',
  templateUrl: './financial-report-graphs.component.html',
  styleUrl: './financial-report-graphs.component.css',
})
export class FinancialReportGraphsComponent implements OnInit, OnChanges {
  @Input() entries!: FinancialReportEntry[];
  @ViewChild('chart') chart!: UIChart;
  revenueChartData: any;
  reservationsChartData: any;

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
