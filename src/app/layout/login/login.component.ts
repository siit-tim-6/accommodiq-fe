import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { LoginRequest } from './login.model';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private roleService: RoleService,
  ) {
    if (this.loginService.getRole() !== null) this.router.navigate(['/search']);
  }

  onSubmit() {
    this.email = this.email.trim();
    if (!this.isFormValid()) return;

    let loginRequest: LoginRequest = {
      email: this.email!,
      password: this.password!,
    };

    this.loginService.login(loginRequest).subscribe({
      next: (response) => {
        const jwt = response.jwt;

        localStorage.setItem('user', jwt);
        this.roleService.updateRole(this.loginService.getRole());

        this.router.navigate(['/search']);
      },
      error: (err) => {
        if (err.status === 401) {
          // The backend returns 401 for both disabled accounts and bad credentials
          // The specific error message from the backend will clarify which case it is
          const errorMessage = err.error.message || 'Unauthorized access';
          alert(errorMessage); // TODO:Replace alert with a more sophisticated notification system
        } else if (err.status === 500) {
          alert('An internal server error occurred. Please try again later.');
        } else {
          alert('An error occurred. Please try again.');
        }
      },
    });
  }

  isFormValid(): boolean {
    if (this.email.trim() === '') return false;
    return this.password.trim() !== '';
  }
}
