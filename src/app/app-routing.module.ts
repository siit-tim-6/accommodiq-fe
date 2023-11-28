import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { RegistrationComponent } from './layout/registration/registration.component';
import {AccommodationListComponent} from "./accommodation/accommodation-list/accommodation-list.component";
import {CommentCardComponent} from "./comment/comment-card/comment-card.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'search', component: AccommodationListComponent },
  { path: 'comment', component: CommentCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
