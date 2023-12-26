import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css',
})
export class AccountInfoComponent {
  imageUrl: string =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
  accountId!: number;
  firstName: string = 'John Doe';
  lastName: string = 'Doe';
  reviewCount: number = 25;
  address: string = 'San Francisco';
  role: string = 'Owner';
  stars: string[] = [];
  rating: number | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: Params) => {
      this.accountId = +params['accountId'];
    });
  }

  ngOnInit() {
    this.calculateStarRating();
  }

  calculateStarRating() {
    this.rating = 3.6; // will be implemented later
    const roundedRating = Math.round(this.rating * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (roundedRating >= i) {
        this.stars.push('pi pi-star-fill');
      } else {
        this.stars.push('pi pi-star');
      }
    }
  }
}
