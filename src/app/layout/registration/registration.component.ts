import { Component } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Account, User } from './registration.model';
import { Router } from '@angular/router';

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
  isEmailFormat: boolean = false;

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
  ) {}

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.isValidForm()) {
      this.isFormSubmitted = false;

      const user: User = {
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        address: this.address.trim(),
        phoneNumber: this.phoneNumber.trim(),
      };

      const account: Account = {
        email: this.email.trim(),
        password: this.password.trim(),
        role: this.selectedRole,
        user: user,
      };
      this.registrationService.registerUser(account).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          alert('Registration successful. Verify your email');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          alert('Registration failed');
        },
      });
    } else {
      console.log('Invalid form');
    }
  }

  isPasswordMatch(): boolean {
    return this.password === this.repeatPassword;
  }

  isEmailValid(): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.isEmailFormat = emailRegex.test(this.email.trim());
    return this.isEmailFormat;
  }

  isValidForm(): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return (
      this.isEmailValid() &&
      this.email.trim() !== '' &&
      this.password.trim() !== '' &&
      this.repeatPassword.trim() !== '' &&
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.address.trim() !== '' &&
      this.phoneNumber.trim() !== '' &&
      this.selectedRole.trim() !== '' &&
      this.isPasswordMatch()
    );
  }
}
