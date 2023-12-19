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
    if (!this.isFormValid()) return;

    let loginRequest: LoginRequest = {
      email: this.email!,
      password: this.password!,
    };

    this.loginService.login(loginRequest).subscribe((response) => {
      const jwt = response.jwt;

      localStorage.setItem('user', jwt);
      this.roleService.updateRole(this.loginService.getRole());

      this.router.navigate(['/search']);
    });
  }

  isFormValid(): boolean {
    if (this.email.trim() === '') return false;
    return this.password.trim() !== '';
  }
}
