import { Component } from '@angular/core';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css',
})
export class UpdateAccountComponent {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  address: string | undefined;
  phoneNumber: string | undefined;
  oldPassword: string | undefined;
  newPassword: string | undefined;
  repeatNewPassword: string | undefined;

  onDelete() {
    console.log('onDelete()');
  }

  onUpdatePersonalData() {
    console.log('onUpdatePersonalData()');
  }

  onUpdatePassword() {
    console.log('onUpdatePassword()');
  }
}
