import { Component, OnInit } from '@angular/core';
import { ReportCardDto } from '../report.model';
import { ReportService } from '../report.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-report-card-list',
  templateUrl: './report-card-list.component.html',
  styleUrl: './report-card-list.component.css',
})
export class ReportCardListComponent implements OnInit {
  reports: ReportCardDto[] = [];

  constructor(
    private service: ReportService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((reports: ReportCardDto[]) => {
      this.reports = reports;
    });
  }

  blockUser(id: number) {
    this.messageService.add({
      severity: 'success',
      summary: 'User blocked',
      detail: `User with id ${id} has been blocked`,
    });
  }

  deleteReport(id: number) {
    this.messageService.add({
      severity: 'success',
      summary: 'Report deleted',
      detail: `Report with id ${id} has been deleted`,
    });
  }
}
