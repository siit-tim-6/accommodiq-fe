import { Component, OnInit } from '@angular/core';
import { ReportCardDto } from '../report.model';
import { ReportService } from '../report.service';
import { MessageService } from 'primeng/api';
import { AccountStatus } from '../../account/account-info/account.model';

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

  blockUser(report: ReportCardDto) {
    this.service
      .changeUserStatus(report.reportedUser.id, AccountStatus.BLOCKED)
      .subscribe({
        next: (_) => {
          this.messageService.add({
            severity: 'success',
            summary: 'User blocked',
            detail: 'User has been blocked successfully',
          });
          this.reports = this.reports.filter((r) => r.id !== report.id);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'User not blocked',
            detail: `${err.error.message}`,
          });
        },
      });
  }

  deleteReport(report: ReportCardDto) {
    this.service.deleteReport(report.id).subscribe({
      next: (_) => {
        this.reports = this.reports.filter((r) => r.id !== report.id);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Report not deleted',
          detail: `${err.error.message}`,
        });
      },
    });
  }
}
