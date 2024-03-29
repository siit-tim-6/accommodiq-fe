import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { RegistrationComponent } from './layout/registration/registration.component';
import { AccommodationListComponent } from './accommodation/accommodation-list/accommodation-list.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { UpdateAccountComponent } from './layout/update-account/update-account.component';
import { AccommodationCreateComponent } from './accommodation/accommodation-create/accommodation-create.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { HostsAccommodationListComponent } from './accommodation/hosts-accommodation-list/hosts-accommodation-list.component';
import { AdminReviewListComponent } from './accommodation/admin-review-list/admin-review-list.component';
import { AccommodationAvailabilityPricingComponent } from './accommodation/accommodation-availability-pricing/accommodation-availability-pricing.component';
import { CanActivateRoles } from './infrastructure/auth/guards/role.guard';
import { AccountRole } from './account/account-info/account.model';
import { AccommodationUpdateComponent } from './accommodation/accommodation-update/accommodation-update.component';
import { ReportFormComponent } from './layout/report-form/report-form.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { ProfileAccountComponent } from './account/profile-account/profile-account.component';
import { GuestFavoritesListComponent } from './accommodation/guest-favorites-list/guest-favorites-list.component';
import { NotificationSettingsComponent } from './notification/notification-settings/notification-settings.component';
import { ReviewApprovalListComponent } from './review/review-approval-list/review-approval-list.component';
import { ReportCardListComponent } from './report/report-card-list/report-card-list.component';
import { FinancialReportListComponent } from './financial-report/financial-report-list/financial-report-list.component';
import { HostReviewApprovalListComponent } from './review/host-review-approval-list/host-review-approval-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'search', component: AccommodationListComponent },
  {
    path: 'accommodation/:accommodationId',
    component: AccommodationDetailsComponent,
  },
  { path: 'update-account', component: UpdateAccountComponent },
  { path: 'accommodation-create', component: AccommodationCreateComponent },
  { path: 'notifications', component: NotificationListComponent },
  { path: 'notification-settings', component: NotificationSettingsComponent },
  { path: 'my-accommodations', component: HostsAccommodationListComponent },
  {
    path: 'accommodation-update/:accommodationId',
    component: AccommodationUpdateComponent,
    canActivate: [() => CanActivateRoles([AccountRole.HOST])],
  },
  {
    path: 'accommodation-availability-pricing/:accommodationId',
    component: AccommodationAvailabilityPricingComponent,
    canActivate: [() => CanActivateRoles([AccountRole.HOST])],
  },
  {
    path: 'accommodations-review',
    component: AdminReviewListComponent,
    canActivate: [() => CanActivateRoles([AccountRole.ADMIN])],
  },
  {
    path: 'my-reservations',
    component: ReservationListComponent,
    canActivate: [
      () => CanActivateRoles([AccountRole.GUEST, AccountRole.HOST]),
    ],
  },
  {
    path: 'profile-account/:accountId',
    component: ProfileAccountComponent,
  },
  {
    path: 'report/:accountId',
    component: ReportFormComponent,
  },
  {
    path: 'favorites',
    component: GuestFavoritesListComponent,
    canActivate: [() => CanActivateRoles([AccountRole.GUEST])],
  },
  {
    path: 'review-approval',
    component: ReviewApprovalListComponent,
    canActivate: [() => CanActivateRoles([AccountRole.ADMIN])],
  },
  {
    path: 'user-reports',
    component: ReportCardListComponent,
    canActivate: [() => CanActivateRoles([AccountRole.ADMIN])],
  },
  {
    path: 'financial-reports',
    component: FinancialReportListComponent,
    canActivate: [() => CanActivateRoles([AccountRole.HOST])],
  },
  {
    path: 'host-reviews-approval',
    component: HostReviewApprovalListComponent,
    canActivate: [() => CanActivateRoles([AccountRole.ADMIN])],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
