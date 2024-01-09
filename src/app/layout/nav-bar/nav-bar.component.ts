import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AccountRole } from '../../account/account-info/account.model';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { WebSockets } from '../../infrastructure/websockets/web-sockets';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  role: AccountRole | null = null;

  constructor(
    private loginService: LoginService,
    private roleService: RoleService,
    private router: Router,
    private webSockets: WebSockets,
  ) {
    this.roleService.role$.subscribe((role) => {
      this.role = role;
    });
    this.roleService.updateRole(this.loginService.getRole());
  }

  signOut() {
    this.loginService.signOut();
    this.router.navigate(['/login']);
    this.webSockets.disconnect();
  }

  protected readonly AccountRole = AccountRole;
}
