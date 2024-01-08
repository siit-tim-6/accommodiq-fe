import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { NotificationModule } from './notification/notification.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Interceptor } from './infrastructure/auth/interceptor';
import { MessageService } from 'primeng/api';
import { NotificationSettingsComponent } from './notification/notification-settings/notification-settings.component';
import { PrimengModule } from './infrastructure/primeng/primeng.module';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [AppComponent, NotificationSettingsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    AccommodationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotificationModule,
    PrimengModule,
    AccountModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
