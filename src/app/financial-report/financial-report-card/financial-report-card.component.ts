import { Component, Input } from '@angular/core';
import { FinancialReportEntry } from '../financial-report.model';
import { environment } from '../../../env/env';

@Component({
  selector: 'app-financial-report-card',
  templateUrl: './financial-report-card.component.html',
  styleUrl: './financial-report-card.component.css',
})
export class FinancialReportCardComponent {
  @Input() entry!: FinancialReportEntry;
  protected imageBase = environment.imageBase;
}
