import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ReportRequestDto } from './report.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageDto } from '../../accommodation/accommodation.model';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css',
})
export class ReportFormComponent {
  formGroup = new FormGroup({
    reason: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  accountId!: number;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.accountId = +params['accountId'];
    });
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.showWarningMessage('Reason needs to have at least 3 characters.');
      return;
    }

    const reportRequest: ReportRequestDto = this.createReportRequest();
    this.reportUser(reportRequest);
  }

  createReportRequest() {
    return {
      reason: this.formGroup.value.reason!,
    };
  }

  reportUser(reportRequest: ReportRequestDto) {
    this.accountService.reportUser(this.accountId, reportRequest).subscribe({
      next: (response: MessageDto) => this.handleReportSuccess(response),
      error: (error) => this.handleReportError(error),
    });
  }

  handleReportSuccess(response: MessageDto) {
    this.showSuccessMessage('User reported successfully', response.message);
    console.log('User reported successfully', response);
    setTimeout(() => {
      this.router.navigate(['/profile-account', this.accountId]);
    }, 2000); // 2000 milliseconds delay
  }

  handleReportError(error: any): void {
    if (
      error.error.message === 'Cannot report user without a past reservation.'
    ) {
      this.showWarningMessage('Cannot report user without a past reservation.');
    } else {
      this.showErrorMessage('Error reporting user');
    }
    console.error('Error reporting user', error);
  }

  showSuccessMessage(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail,
    });
  }

  showWarningMessage(detail: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: detail,
    });
  }

  showErrorMessage(detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detail,
    });
  }
}
