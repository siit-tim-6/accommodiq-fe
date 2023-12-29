import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewRequest } from '../../layout/profile-account/host-account.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrl: './add-comment-form.component.css',
})
export class AddCommentFormComponent {
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
      this.reviewForm.patchValue({
        rating: 0,
        comment: '',
      });
      this.reviewSubmitted.emit({ ...this.reviewForm.value });
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
