import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../login/login.service';
import { AccountDetails, AccountRole } from './account.model';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css',
})
export class AccountInfoComponent {
  @Input() user!: AccountDetails;
  @Input() averageRating: number = 0;
  @Input() numberOfReviews: number = 0;
  imageUrl: string =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
  accountId!: number;
  stars: string[] = [];
  currentUserRole: string = '';
  currentUserEmail: string = '';

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) {
    this.route.queryParams.subscribe((params: Params) => {
      this.accountId = +params['accountId'];
      this.currentUserEmail = this.loginService.getEmail();
      this.currentUserRole = this.loginService.getRole() || '';
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['averageRating'] && this.user?.role === AccountRole.HOST) {
      this.calculateStarRating(this.averageRating);
    }
  }

  calculateStarRating(rating: number) {
    const roundedRating = Math.round(rating * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (roundedRating >= i) {
        this.stars.push('pi pi-star-fill');
      } else {
        this.stars.push('pi pi-star');
      }
    }
  }

  protected readonly AccountRole = AccountRole;
}
