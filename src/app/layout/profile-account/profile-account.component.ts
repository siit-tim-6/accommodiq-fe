import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostAccountService } from './host-account.service';
import { ReviewDto, ReviewRequest } from './host-account.model';
import { Comment } from '../../comment/comment.model';
import { MessageDto } from '../../accommodation/accommodation.model';
import { LoginService } from '../login/login.service';
import { AccountDetails, AccountRole } from '../account-info/account.model';
import { AccountService } from '../../services/account.service';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrl: './profile-account.component.css',
})
export class ProfileAccountComponent {
  accountDetails!: AccountDetails;
  reviews: Comment[] = [];
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
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.accountId = +params['accountId'];
      this.fetchAccountDetails(this.accountId);
      this.currentUserEmail = this.loginService.getEmail();
      this.currentUserRole = this.loginService.getRole() || '';
      this.canAddComment = this.currentUserRole === 'GUEST';
    });
  }

  private fetchAccountDetails(accountId: number): void {
    this.accountService
      .getAccountDetailsById(accountId)
      .pipe(
        catchError((error) => {
          console.error('Error fetching account details', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error fetching account details. Please try again later.',
          });
          return throwError(() => new Error('Error fetching account details'));
        }),
      )
      .subscribe((details: AccountDetails) => {
        console.log(details);
        this.accountDetails = details;
        if (this.accountDetails.role === AccountRole.HOST) {
          this.fetchReviews(this.accountId);
          this.canReport =
            this.currentUserEmail === this.accountDetails.email &&
            this.currentUserRole === 'HOST';
        }
      });
  }

  private fetchReviews(accountId: number): void {
    this.hostAccountService
      .getHostReviews(accountId)
      .pipe(
        catchError((error) => {
          console.error('Error fetching host reviews', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error fetching host reviews. Please try again later.',
          });
          return throwError(() => new Error('Error fetching host reviews'));
        }),
      )
      .subscribe((reviews: ReviewDto[]) => {
        console.log(reviews);
        this.reviews = reviews.map((review) => this.convertToComment(review));
        this.calculateAverageRatingAndCount();
      });
  }

  private convertToComment(reviewDto: ReviewDto): Comment {
    return {
      id: reviewDto.id,
      rating: reviewDto.rating,
      author: reviewDto.author,
      comment: reviewDto.comment,
      date: new Date(reviewDto.date),
      canDelete: reviewDto.canDelete,
    };
  }

  handleReviewSubmission(review: ReviewRequest) {
    this.hostAccountService
      .addHostReview(this.accountId, review)
      .pipe(
        catchError((error) => {
          let errorMessage = 'Error adding host review';
          if (
            error.status === 403 &&
            error.error.message.includes('Guest cannot comment')
          ) {
            errorMessage = error.error.message; // Specific error message
          }
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
          });
          return throwError(error);
        }),
      )
      .subscribe((reviewDto: ReviewDto) => {
        this.reviews.push(this.convertToComment(reviewDto));
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Review added successfully',
        });
        this.calculateAverageRatingAndCount();
      });
  }

  handleDeleteReview(reviewId: number) {
    this.hostAccountService
      .deleteHostReview(reviewId)
      .pipe(
        catchError((error) => {
          console.error('Error deleting review', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error deleting review. Please try again later.',
          });
          return throwError(() => new Error('Error deleting review'));
        }),
      )
      .subscribe((response: MessageDto) => {
        console.log(response);
        this.reviews = this.reviews.filter((review) => review.id !== reviewId);
        this.calculateAverageRatingAndCount();
      });
  }

  handleReportReview(reviewId: number) {
    this.hostAccountService
      .reportHostReview(reviewId)
      .pipe(
        catchError((error) => {
          console.error('Error reporting review', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error reporting review. Please try again later.',
          });
          return throwError(() => new Error('Error reporting review'));
        }),
      )
      .subscribe((response: MessageDto) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Report Successful',
          detail: 'Review reported successfully.',
        });
      });
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

  protected readonly AccountRole = AccountRole;
}
