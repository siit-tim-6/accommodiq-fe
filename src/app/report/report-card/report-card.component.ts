import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportCardDto } from '../report.model';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.css',
})
export class ReportCardComponent {
  @Input() report!: ReportCardDto;

  @Output() onBlockUser = new EventEmitter<ReportCardDto>();
  @Output() onDelete = new EventEmitter<ReportCardDto>();

  constructor() {}

  blockUser() {
    this.onBlockUser.emit(this.report);
  }

  deleteReport() {
    this.onDelete.emit(this.report);
  }
}
