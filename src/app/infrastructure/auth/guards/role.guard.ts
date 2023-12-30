import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountRole } from '../../../layout/account-info/account.model';
import { JwtService } from '../jwt.service';

export const CanActivateRole = (role: AccountRole) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  let token = localStorage.getItem('user');
  if (token === null || jwtService.getRole() !== role) {
    router.navigate(['/search']); //unauthorized
    return false;
  }
  return true;
};
