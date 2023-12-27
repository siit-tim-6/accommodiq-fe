import { Component } from '@angular/core';
import {
  AccountInfoDetails,
  HostAccountDetails,
} from '../account-info/account.model';
import { ActivatedRoute } from '@angular/router';
import { HostAccountService } from './host-account.service';
import { HostReviewDto } from './host-account.model';

@Component({
  selector: 'app-host-account',
  templateUrl: './host-account.component.html',
  styleUrl: './host-account.component.css',
})
export class HostAccountComponent {
  accountDetails!: HostAccountDetails;
  reviews!: HostReviewDto[];

  constructor(
    private route: ActivatedRoute,
    private accountService: HostAccountService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const accountId = +params['accountId'];
      this.fetchAccountDetails(accountId);
      this.fetchReviews(accountId);
    });
  }

  private fetchAccountDetails(accountId: number): void {
    this.accountService.getHostDetails(accountId).subscribe(
      (details: HostAccountDetails) => {
        this.accountDetails = details;
      },
      (error) => {
        console.error('Error fetching host account details', error);
      },
    );
  }

  private fetchReviews(accountId: number): void {
    this.accountService.getHostReviews(accountId).subscribe(
      (reviews: HostReviewDto[]) => {
        this.reviews = reviews;
      },
      (error) => {
        console.error('Error fetching host reviews', error);
      },
    );
  }
}
