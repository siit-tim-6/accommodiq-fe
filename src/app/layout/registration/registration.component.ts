import { Component } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Account, User } from './registration.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private messageService: MessageService,
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
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Successful',
            detail: 'Registration successful. Verify your email',
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          let detailMessage = 'Registration failed';
          if (
            error.error &&
            error.error.message === 'Email is already in use'
          ) {
            detailMessage = 'Registration failed: Email is already in use';
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: detailMessage,
          });
        },
      });
    } else {
      console.log('Invalid form');
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Form',
        detail: 'Please fill out the form correctly.',
      });
    }
  }

  isPasswordMatch(): boolean {
    return this.password === this.repeatPassword;
  }

  isEmailValid(): boolean {
    const emailRegex =
      /^[a-zA-Z0-9._-]+(\+[a-zA-Z0-9._-]+)?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(this.email.trim());
  }

  isPhoneValid(): boolean {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(this.phoneNumber.trim());
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
      this.isPasswordMatch() &&
      this.isPhoneValid()
    );
  }
}
