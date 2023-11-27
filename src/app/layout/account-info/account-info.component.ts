import { Component } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css'
})
export class AccountInfoComponent {
  imageUrl: string = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';
  firstName: string = 'John Doe';
  lastName: string = 'Doe';
  numReviews: number = 25;
  address: string = 'San Francisco';
  role: string = 'Owner';
  stars: string[] = [];

  ngOnInit() {
    this.calculateStarRating();
  }

  calculateStarRating() {
    const rating = 4.5; // will be implemented later
    const roundedRating = Math.round(rating*2)/2;

    for (let i = 1; i <= 5; i++) {
      if (roundedRating >= 1) {
        this.stars.push('fa fa-star');
      } else if (roundedRating === 0.5) {
        this.stars.push('fa fa-star-half-o');
      } else {
        this.stars.push('fa fa-star-o');
      }
    }
  }
}
