import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportCardDto } from '../report.model';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.css',
})
export class ReportCardComponent {
  @Input() reportCard!: ReportCardDto;

  @Output() blockUserEmitter = new EventEmitter<number>();
  @Output() deleteReportEmitter = new EventEmitter<number>();

  constructor() {}

  blockUser(id: number) {
    this.blockUserEmitter.emit(id);
  }

  deleteReport(id: number) {
    this.deleteReportEmitter.emit(id);
  }
}
