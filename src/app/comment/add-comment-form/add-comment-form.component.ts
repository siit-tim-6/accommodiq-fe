import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HostReviewRequest } from '../../layout/host-account/host-account.model';

@Component({
  selector: 'app-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrl: './add-comment-form.component.css',
})
export class AddCommentFormComponent {
  @Output() reviewSubmitted: EventEmitter<HostReviewRequest> =
    new EventEmitter<HostReviewRequest>();
  reviewForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      comment: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      // Emit the event with the review data and additional context (targetId and targetType)
      this.reviewSubmitted.emit({ ...this.reviewForm.value });
    }
  }
}
