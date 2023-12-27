import { Component } from '@angular/core';
import { HostAccountDetails } from '../account-info/account.model';
import { ActivatedRoute } from '@angular/router';
import { HostAccountService } from './host-account.service';
import { HostReviewDto, HostReviewRequest } from './host-account.model';
import { Comment } from '../../comment/comment.model';
import { MessageDto } from '../../accommodation/accommodation.model';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-host-account',
  templateUrl: './host-account.component.html',
  styleUrl: './host-account.component.css',
})
export class HostAccountComponent {
  accountDetails!: HostAccountDetails;
  reviews!: Comment[];
  canAddComment: boolean = true;
  accountId!: number;
  currentUserRole: string = '';
  currentUserEmail: string = '';

  constructor(
    private route: ActivatedRoute,
    private accountService: HostAccountService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.accountId = +params['accountId'];
      this.fetchAccountDetails(this.accountId);
      this.fetchReviews(this.accountId);
      this.currentUserEmail = this.loginService.getEmail();
      this.currentUserRole = this.loginService.getRole() || '';
      this.canAddComment = this.currentUserRole === 'GUEST';
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
        this.reviews = reviews.map((review) => this.convertToComment(review));
      },
      (error) => {
        console.error('Error fetching host reviews', error);
      },
    );
  }

  private convertToComment(reviewDto: HostReviewDto): Comment {
    return {
      id: reviewDto.id,
      rating: reviewDto.rating,
      author: reviewDto.author,
      comment: reviewDto.comment,
      date: new Date(reviewDto.date),
      canDelete: reviewDto.canDelete,
    };
  }

  handleReviewSubmission(review: HostReviewRequest) {
    // Call service to submit the review
    console.log('Review added successfully');
    this.accountService.addHostReview(this.accountId, review).subscribe(
      (reviewDto: HostReviewDto) => {
        // Add the new review to the list of reviews
        this.reviews.push(this.convertToComment(reviewDto));
        console.log('Review added successfully');
        this.fetchAccountDetails(this.accountId);
      },
      (error) => {
        console.error('Error adding host review', error);
      },
    );
  }

  handleDeleteReview(reviewId: number) {
    // Call the service to delete the review
    this.accountService.deleteHostReview(reviewId).subscribe(
      (response: MessageDto) => {
        // Handle successful deletion
        console.log(response);
        // Remove the deleted review from the reviews array
        this.reviews = this.reviews.filter((review) => review.id !== reviewId);
        this.fetchAccountDetails(this.accountId);
      },
      (error) => {
        // Handle error
        console.error('Error deleting review', error);
      },
    );
  }
}
