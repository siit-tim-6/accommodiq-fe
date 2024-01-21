import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountRole } from '../../../account/account-info/account.model';
import { JwtService } from '../jwt.service';
export const CanActivateRoles = (roles: AccountRole[]) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  let role = jwtService.getRole();
  if (role === null || !roles.includes(role)) {
    router.navigate(['/search']).then((_) => {});
    return false;
  }
  return true;
};
