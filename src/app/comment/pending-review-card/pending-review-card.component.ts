import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PendingReviewDto } from '../review.model';
import { environment } from '../../../env/env';

@Component({
  selector: 'app-pending-review-card',
  templateUrl: './pending-review-card.component.html',
  styleUrl: './pending-review-card.component.css',
})
export class PendingReviewCardComponent {
  @Input() pendingReview!: PendingReviewDto;
  @Output() approveEmitter = new EventEmitter<PendingReviewDto>();
  @Output() declineEmitter = new EventEmitter<PendingReviewDto>();

  protected readonly environment = environment;
  protected readonly Math = Math;

  approve() {
    this.approveEmitter.emit(this.pendingReview);
  }

  decline() {
    this.declineEmitter.emit(this.pendingReview);
  }
}
