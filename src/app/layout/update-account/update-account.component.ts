import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css',
})
export class UpdateAccountComponent implements OnInit {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  address: string | undefined;
  phoneNumber: string | undefined;
  oldPassword: string | undefined;
  newPassword: string | undefined;
  repeatNewPassword: string | undefined;

  constructor(private accountService: AccountService) {}

  onDelete() {
    console.log('onDelete()');
  }

  onUpdatePersonalData() {
    console.log('onUpdatePersonalData()');
  }

  onUpdatePassword() {
    console.log('onUpdatePassword()');
  }

  ngOnInit(): void {
    this.accountService.getAccountDetails().subscribe((accountDetails) => {
      this.firstName = accountDetails.firstName;
      this.lastName = accountDetails.lastName;
      this.email = accountDetails.email;
      this.address = accountDetails.address;
      this.phoneNumber = accountDetails.phoneNumber;
    });
  }
}
