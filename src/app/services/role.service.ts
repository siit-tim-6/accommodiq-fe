import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountRole } from '../account/account-info/account.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private roleSubject = new BehaviorSubject<AccountRole | null>(null);
  role$ = this.roleSubject.asObservable();

  updateRole(role: AccountRole | null) {
    this.roleSubject.next(role);
  }
}
