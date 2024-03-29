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
  oldPassword: string | undefined;
  newPassword: string | undefined;
  repeatNewPassword: string | undefined;

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
    if (!this.areDetailsValid()) {
      alert('Please fill in all the fields');
      return;
    }
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

  private areDetailsValid() {
    return (
      this.accountDetails.firstName !== '' &&
      this.accountDetails.lastName !== '' &&
      this.accountDetails.email === this.loginService.getEmail() &&
      this.accountDetails.email !== '' &&
      this.accountDetails.phoneNumber !== '' &&
      this.accountDetails.address !== ''
    );
  }

  private arePasswordsValid() {
    return (
      this.oldPassword !== '' &&
      this.newPassword !== '' &&
      this.repeatNewPassword !== ''
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
