import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountRole } from '../../../account/account-info/account.model';
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

export const CanActivateRoles = (roles: AccountRole[]) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  let role = jwtService.getRole();
  if (role === null || !roles.includes(role)) {
    router.navigate(['/search']);
    return false;
  }
  return true;
};
