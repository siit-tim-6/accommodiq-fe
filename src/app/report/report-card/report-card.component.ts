import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportCardDto } from '../report.model';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.css',
})
export class ReportCardComponent {
  @Input() report!: ReportCardDto;

  @Output() onBlockUser = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  constructor() {}

  blockUser(id: number) {
    this.onBlockUser.emit(id);
  }

  deleteReport(id: number) {
    this.onDelete.emit(id);
  }
}
