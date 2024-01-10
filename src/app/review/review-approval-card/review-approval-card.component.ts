import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReviewApprovalCardDto } from '../review.model';
import { environment } from '../../../env/env';

@Component({
  selector: 'app-review-approval-card',
  templateUrl: './review-approval-card.component.html',
  styleUrl: './review-approval-card.component.css',
})
export class ReviewApprovalCardComponent {
  @Input() review!: ReviewApprovalCardDto;
  @Output() approveEmitter = new EventEmitter<ReviewApprovalCardDto>();
  @Output() declineOrDeleteEmitter = new EventEmitter<ReviewApprovalCardDto>();

  protected readonly environment = environment;
  protected readonly Math = Math;

  approve() {
    this.approveEmitter.emit(this.review);
  }

  decline() {
    this.declineOrDeleteEmitter.emit(this.review);
  }
}
