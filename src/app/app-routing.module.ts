import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { RegistrationComponent } from './layout/registration/registration.component';
import { AccommodationListComponent } from './accommodation/accommodation-list/accommodation-list.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { AccountInfoComponent } from './layout/account-info/account-info.component';
import { UpdateAccountComponent } from './layout/update-account/update-account.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
