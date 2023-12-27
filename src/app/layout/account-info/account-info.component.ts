import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GuestAccountDetails, HostAccountDetails } from './account.model';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css',
})
export class AccountInfoComponent {
  @Input() user!: HostAccountDetails | GuestAccountDetails;
  imageUrl: string =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
  accountId!: number;
  stars: string[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: Params) => {
      this.accountId = +params['accountId'];
    });
  }

  ngOnInit() {
    if (this.user.role === 'Host') {
      this.calculateStarRating((this.user as HostAccountDetails).rating);
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

  get hostDetails(): HostAccountDetails | null {
    return this.user.role === 'Host' ? (this.user as HostAccountDetails) : null;
  }
}
