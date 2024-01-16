import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../../layout/login/login.service';
import { AccountDetails, AccountRole } from './account.model';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css',
})
export class AccountInfoComponent {
  @Input() user?: AccountDetails;
  @Input() averageRating: number = 0;
  @Input() numberOfReviews: number = 0;
  @Input() accountId: number = 0;
  @Output() handleReportUserBtn: EventEmitter<number> =
    new EventEmitter<number>();
  imageUrl: string =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
  stars: string[] = [];
  currentUserRole: string = '';
  currentUserEmail: string = '';

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentUserEmail = this.loginService.getEmail();
      this.currentUserRole = this.loginService.getRole() || '';
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['averageRating'] && this.user?.role === AccountRole.HOST) {
      this.calculateStarRating(this.averageRating);
    }
  }

  calculateStarRating(rating: number) {
    const roundedRating = Math.round(rating * 2) / 2;
    this.stars = [];

    for (let i = 1; i <= 5; i++) {
      if (roundedRating >= i) {
        this.stars.push('pi pi-star-fill');
      } else {
        this.stars.push('pi pi-star');
      }
    }
  }

  protected readonly AccountRole = AccountRole;

  reportUserBtnClick() {
    this.handleReportUserBtn.emit(this.accountId);
  }

  editUserBtnClick() {
    this.router.navigate(['update-account']);
  }
}
