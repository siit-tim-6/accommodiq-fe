import {Router} from "@angular/router";
import {inject} from "@angular/core";
import {LoginService} from "../layout/login/login.service";
import {AccountRole} from "../layout/account-info/account.model";

export const CanActivateAdmin = () => {
  const jwtService = inject(LoginService);
  const router = inject(Router);

  let token = localStorage.getItem("user");
  if (token === null || jwtService.getRole(token) !== AccountRole.ADMIN) {
    router.navigate(['/search']); //unauthorized
    return false;
  }
  return true;
}
