import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../../../layout/login/login.service';
import { AccountRole } from '../../../layout/account-info/account.model';

export const CanActivateRole = (role: AccountRole) => {
  const jwtService = inject(LoginService);
  const router = inject(Router);

  let token = localStorage.getItem('user');
  if (token === null || jwtService.getRole() !== role) {
    router.navigate(['/search']); //unauthorized
    return false;
  }
  return true;
};
