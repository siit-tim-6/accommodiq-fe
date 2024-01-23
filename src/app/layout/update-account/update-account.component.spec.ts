import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateAccountComponent } from './update-account.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import {
  AccountServiceMock,
  validAccountDetails,
} from '../../services/account.service.mock';
import { of } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { MessageService } from 'primeng/api';
import { AccountRole } from '../../account/account-info/account.model';

describe('UpdateAccountComponent', () => {
  let component: UpdateAccountComponent;
  let fixture: ComponentFixture<UpdateAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAccountComponent],
      imports: [FormsModule, HttpClientTestingModule, HttpClientModule],
      providers: [
        MessageService,
        { provide: AccountService, useClass: AccountServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAccountComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  });

  it('should create Update Account Component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch Account Details on init', waitForAsync(() => {
    const accountService = fixture.debugElement.injector.get(AccountService);
    spyOn(accountService, 'getAccountDetails');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.accountDetails).toEqual(validAccountDetails);
    });
  }));

  it('should disable the button when the passwords are empty', () => {
    component.accountDetails = validAccountDetails;
    component.newPassword = '';
    component.repeatNewPassword = '';
    component.oldPassword = '12345';

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#password-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should disable the button when the passwords are not matching', () => {
    component.accountDetails = validAccountDetails;
    component.newPassword = '123456';
    component.repeatNewPassword = '1234567';

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#password-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the button when the passwords are matching', () => {
    component.accountDetails = validAccountDetails;
    component.newPassword = '123456';
    component.repeatNewPassword = '123456';
    component.oldPassword = '12345';

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#password-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should disable the button when the old password is same as the new password', () => {
    component.accountDetails = validAccountDetails;
    component.newPassword = '123456';
    component.repeatNewPassword = '123456';
    component.oldPassword = '123456';

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#password-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should disable the button when the old password is empty', () => {
    component.accountDetails = validAccountDetails;
    component.newPassword = '123456';
    component.repeatNewPassword = '123456';
    component.oldPassword = '';

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#password-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should call updatePassword when the button is clicked', () => {
    component.accountDetails = validAccountDetails;
    component.newPassword = '123456';
    component.repeatNewPassword = '123456';
    component.oldPassword = '12345';
    spyOn(component, 'onUpdatePassword');

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#password-button'));
    button.nativeElement.click();

    expect(component.onUpdatePassword).toHaveBeenCalled();
  });

  it('should disable the button when the form is invalid', () => {
    component.accountDetails = validAccountDetails;
    component.accountDetails.firstName = '';

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#personal-data-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the button when the form is valid', () => {
    let accountService = fixture.debugElement.injector.get(AccountService);
    spyOn(accountService, 'updateAccountDetails').and.returnValue(
      of(validAccountDetails),
    );
    spyOn(component, 'onUpdatePersonalData');
    component.accountDetails = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email123@example.com',
      address: 'Address 123',
      phoneNumber: '123456789',
      role: AccountRole.HOST,
    };

    fixture.detectChanges();

    expect(component.accountDetails.firstName).toEqual('John');

    const button = fixture.debugElement.query(By.css('#personal-data-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeFalsy();

    button.nativeElement.click();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.onUpdatePersonalData).toHaveBeenCalled();
      expect(accountService.updateAccountDetails).toHaveBeenCalled();
    });
  });
});
