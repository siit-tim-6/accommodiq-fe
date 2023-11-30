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
  reviewCount: number = 25;
  address: string = 'San Francisco';
  role: string = 'Owner';
  stars: string[] = [];
  rating: number | undefined;

  ngOnInit() {
    this.calculateStarRating();
  }

  calculateStarRating() {
    this.rating = 3.6; // will be implemented later
    const roundedRating = Math.round(this.rating*2)/2

    for (let i = 1; i <= 5; i++) {
      if (roundedRating >= i) {
        this.stars.push('pi pi-star-fill');
      } else {
        this.stars.push('pi pi-star');
      }
    }
  }
}