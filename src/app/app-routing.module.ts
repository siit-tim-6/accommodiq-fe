import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { RegistrationComponent } from './layout/registration/registration.component';
import { AccommodationListComponent } from './accommodation/accommodation-list/accommodation-list.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { AccountInfoComponent } from './layout/account-info/account-info.component';
import { UpdateAccountComponent } from './layout/update-account/update-account.component';
import { AccommodationCreateComponent } from './accommodation/accommodation-create/accommodation-create.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { HostsAccommodationListComponent } from './accommodation/hosts-accommodation-list/hosts-accommodation-list.component';
import { AdminReviewListComponent } from './accommodation/admin-review-list/admin-review-list.component';
import { AccommodationAvailabilityPricingComponent } from './accommodation/accommodation-availability-pricing/accommodation-availability-pricing.component';
import { CanActivateRole } from './infrastructure/auth/guards/role.guard';
import { AccountRole } from './layout/account-info/account.model';
import { AccommodationUpdateComponent } from './accommodation/accommodation-update/accommodation-update.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'account-info', component: AccountInfoComponent },
  { path: 'search', component: AccommodationListComponent },
  {
    path: 'accommodation/:accommodationId',
    component: AccommodationDetailsComponent,
  },
  { path: 'update-account', component: UpdateAccountComponent },
  { path: 'accommodation-create', component: AccommodationCreateComponent },
  { path: 'notifications', component: NotificationListComponent },
  { path: 'my-accommodations', component: HostsAccommodationListComponent },
  {
    path: 'accommodation-update/:accommodationId',
    component: AccommodationUpdateComponent,
    canActivate: [() => CanActivateRole(AccountRole.HOST)],
  },
  {
    path: 'accommodation-availability-pricing/:accommodationId',
    component: AccommodationAvailabilityPricingComponent,
    canActivate: [() => CanActivateRole(AccountRole.HOST)],
  },
  {
    path: 'accommodations-review',
    component: AdminReviewListComponent,
    canActivate: [() => CanActivateRole(AccountRole.ADMIN)],
  },
  {
    path: 'my-reservations',
    component: ReservationListComponent,
    canActivate: [() => CanActivateRole(AccountRole.GUEST)],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
