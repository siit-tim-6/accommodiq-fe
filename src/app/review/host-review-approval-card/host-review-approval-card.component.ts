import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HostReviewApprovalCardDto } from '../review.model';

@Component({
  selector: 'app-host-review-approval-card',
  templateUrl: './host-review-approval-card.component.html',
  styleUrl: './host-review-approval-card.component.css',
})
export class HostReviewApprovalCardComponent {
  @Input() hostReview!: HostReviewApprovalCardDto;

  @Output() acceptEmitter: EventEmitter<HostReviewApprovalCardDto> =
    new EventEmitter<HostReviewApprovalCardDto>();
  @Output() deleteEmitter: EventEmitter<HostReviewApprovalCardDto> =
    new EventEmitter<HostReviewApprovalCardDto>();

  constructor() {}

  protected readonly Math = Math;

  accept() {
    this.acceptEmitter.emit(this.hostReview);
  }

  delete() {
    this.deleteEmitter.emit(this.hostReview);
  }
}
