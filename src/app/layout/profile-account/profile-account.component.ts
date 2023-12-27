import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostAccountService } from './host-account.service';
import { HostReviewDto, HostReviewRequest } from './host-account.model';
import { Comment } from '../../comment/comment.model';
import { MessageDto } from '../../accommodation/accommodation.model';
import { LoginService } from '../login/login.service';
import { AccountDetails } from '../account-info/account.model';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrl: './profile-account.component.css',
})
export class ProfileAccountComponent {
  accountDetails!: AccountDetails;
  reviews!: Comment[];
  canAddComment: boolean = true;
  canReport: boolean = false;
  accountId!: number;
  currentUserRole: string = '';
  currentUserEmail: string = '';
  averageRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private hostAccountService: HostAccountService,
    private loginService: LoginService,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.accountId = +params['accountId'];
      this.fetchAccountDetails(this.accountId);
      this.fetchReviews(this.accountId);
      this.currentUserEmail = this.loginService.getEmail();
      this.currentUserRole = this.loginService.getRole() || '';
      this.canAddComment = this.currentUserRole === 'GUEST';
      this.canReport =
        this.currentUserEmail === this.accountDetails.email &&
        this.currentUserRole === 'HOST';
    });
  }

  private fetchAccountDetails(accountId: number): void {
    this.accountService.getAccountDetailsById(accountId).subscribe(
      (details: AccountDetails) => {
        this.accountDetails = details;
      },
      (error) => {
        console.error('Error fetching host account details', error);
      },
    );
  }

  private fetchReviews(accountId: number): void {
    this.hostAccountService.getHostReviews(accountId).subscribe(
      (reviews: HostReviewDto[]) => {
        this.reviews = reviews.map((review) => this.convertToComment(review));
        this.calculateAverageRatingAndCount();
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
    this.hostAccountService.addHostReview(this.accountId, review).subscribe(
      (reviewDto: HostReviewDto) => {
        // Add the new review to the list of reviews
        this.reviews.push(this.convertToComment(reviewDto));
        console.log('Review added successfully');
        this.calculateAverageRatingAndCount();
      },
      (error) => {
        console.error('Error adding host review', error);
      },
    );
  }

  handleDeleteReview(reviewId: number) {
    // Call the service to delete the review
    this.hostAccountService.deleteHostReview(reviewId).subscribe(
      (response: MessageDto) => {
        console.log(response);
        this.reviews = this.reviews.filter((review) => review.id !== reviewId);
        this.calculateAverageRatingAndCount();
      },
      (error) => {
        // Handle error
        console.error('Error deleting review', error);
      },
    );
  }

  handleReportReview(reviewId: number) {
    // Call the service to report the review
    this.hostAccountService.reportHostReview(reviewId).subscribe(
      (response: MessageDto) => {
        console.log(response);
      },
      (error) => {
        // Handle error
        console.error('Error reporting review', error);
      },
    );
  }

  private calculateAverageRatingAndCount(): void {
    if (this.reviews.length > 0) {
      const totalRating = this.reviews.reduce(
        (acc: number, review: Comment) => acc + review.rating,
        0,
      );
      this.averageRating = totalRating / this.reviews.length;
    } else {
      this.averageRating = 0;
    }
  }
}
