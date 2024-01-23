import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AccountDetails } from '../../account/account-info/account.model';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css',
})
export class UpdateAccountComponent implements OnInit {
  accountDetails!: AccountDetails;
  oldPassword: string = '';
  newPassword: string = '';
  repeatNewPassword: string = '';

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  onDelete() {
    this.accountService.deleteAccount().subscribe({
      next: () => {
        this.loginService.signOut();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Delete Failed',
          detail: err.error.message,
        });
      },
    });
  }

  onUpdatePersonalData() {
    this.prepareAccountDetails();
    this.accountService.updateAccountDetails(this.accountDetails).subscribe({
      next: () => {
        alert('Account details updated successfully');
      },
      error: (_) => {
        alert('An error occurred. Please try again.');
      },
    });
  }

  onUpdatePassword() {
    if (!this.arePasswordsValid()) {
      alert('Please fill in all the fields');
      return;
    }
    if (this.newPassword !== this.repeatNewPassword) {
      alert('Passwords do not match');
      return;
    }
    this.accountService
      .updatePassword({
        oldPassword: this.oldPassword!,
        newPassword: this.newPassword!,
      })
      .subscribe({
        next: () => {
          alert('Password updated successfully');
        },
        error: (_) => {
          alert('An error occurred. Please try again.');
        },
      });
  }

  ngOnInit(): void {
    this.accountService.getAccountDetails().subscribe((accountDetails) => {
      this.accountDetails = accountDetails;
    });
  }

  protected areDetailsValid() {
    return (
      this.accountDetails.firstName.trim() !== '' &&
      this.accountDetails.lastName.trim() !== '' &&
      this.accountDetails.email.trim() !== '' &&
      this.accountDetails.phoneNumber.trim() !== '' &&
      this.accountDetails.address.trim() !== ''
    );
  }

  protected arePasswordsValid() {
    return (
      this.oldPassword?.trim() !== '' &&
      this.newPassword?.trim() !== '' &&
      this.repeatNewPassword?.trim() !== '' &&
      this.oldPassword?.trim() !== this.newPassword?.trim() &&
      this.newPassword?.trim() === this.repeatNewPassword?.trim()
    );
  }

  private prepareAccountDetails() {
    this.accountDetails.email = this.accountDetails.email.trim();
    this.accountDetails.firstName = this.accountDetails.firstName.trim();
    this.accountDetails.lastName = this.accountDetails.lastName.trim();
    this.accountDetails.phoneNumber = this.accountDetails.phoneNumber.trim();
    this.accountDetails.address = this.accountDetails.address.trim();
  }
}
