import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  phoneNumber: string = '';
  selectedRole: string = '';
  isFormSubmitted: boolean = false;

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
          this.selectedRole,
      );
    }
  }
}
