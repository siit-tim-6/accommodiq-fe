import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  email: string | undefined;
  password: string | undefined;
  repeatPassword: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  address: string | undefined;
  phoneNumber: string | undefined;
  selectedRole: string | undefined;

  onSubmit() {
    if (this.password != this.repeatPassword) {
      console.log('Passwords do not match');
    } else {
      console.log('Registration successful');
      console.log(
        this.email +
          ' ' +
          this.password +
          ' ' +
          this.repeatPassword +
          ' ' +
          this.firstName +
          ' ' +
          this.lastName +
          ' ' +
          this.address +
          ' ' +
          this.phoneNumber +
          ' ' +
          this.selectedRole
      );
    }
  }
}
