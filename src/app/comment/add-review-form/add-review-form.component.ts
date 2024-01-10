import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewRequest } from '../review.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-review-form',
  templateUrl: './add-review-form.component.html',
  styleUrl: './add-review-form.component.css',
})
export class AddReviewFormComponent {
  @Output() reviewSubmitted: EventEmitter<ReviewRequest> =
    new EventEmitter<ReviewRequest>();
  reviewForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
    this.reviewForm = this.fb.group({
      comment: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      this.reviewSubmitted.emit({ ...this.reviewForm.value });
      this.reviewForm.patchValue({
        rating: 0,
        comment: '',
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail:
          'Please fill in all required fields before submitting your review.',
      });
    }
  }
}
