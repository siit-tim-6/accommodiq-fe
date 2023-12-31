import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ReportRequestDto } from './report.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
    if (this.formGroup.valid) {
      const reportRequest: ReportRequestDto = {
        reason: this.formGroup.value.reason!,
      };

      this.accountService.reportUser(this.accountId, reportRequest).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
          console.log('User reported successfully', response);
          setTimeout(() => {
            this.router.navigate(['/profile-account', this.accountId]);
          }, 2000); // 2000 milliseconds delay
        },
        error: (error) => {
          // Check if the error is the specific IllegalStateException
          if (
            error.error.message ===
            'Cannot report user without a past reservation.'
          ) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Warning',
              detail: 'Cannot report user without a past reservation.',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error reporting user',
            });
          }
          console.error('Error reporting user', error);
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Reason needs to have at least 3 characters.',
      });
    }
  }
}
