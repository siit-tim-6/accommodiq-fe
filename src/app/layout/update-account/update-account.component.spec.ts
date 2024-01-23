import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccountComponent } from './update-account.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { By } from '@angular/platform-browser';
import { AccountService } from '../../services/account.service';
import { accountDetails } from '../../services/account.service.mock';
import { AccountRole } from '../../account/account-info/account.model';
import { LoginService } from '../login/login.service';

describe('UpdateAccountComponent', () => {
  let component: UpdateAccountComponent;
  let fixture: ComponentFixture<UpdateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [UpdateAccountComponent],
      providers: [MessageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAccountComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the button when the passwords are empty', () => {
    component.accountDetails = accountDetails;
    component.newPassword = '';
    component.repeatNewPassword = '';
    component.oldPassword = '12345';

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#password-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should disable the button when the passwords are not matching', () => {
    component.accountDetails = accountDetails;
    component.newPassword = '123456';
    component.repeatNewPassword = '1234567';

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#password-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the button when the passwords are matching', () => {
    component.accountDetails = accountDetails;
    component.newPassword = '123456';
    component.repeatNewPassword = '123456';
    component.oldPassword = '12345';

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#password-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should disable the button when the old password is same as the new password', () => {
    component.accountDetails = accountDetails;
    component.newPassword = '123456';
    component.repeatNewPassword = '123456';
    component.oldPassword = '123456';

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#password-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should disable the button when the old password is empty', () => {
    component.accountDetails = accountDetails;
    component.newPassword = '123456';
    component.repeatNewPassword = '123456';
    component.oldPassword = '';

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#password-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should call updatePassword when the button is clicked', () => {
    component.accountDetails = accountDetails;
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
    component.accountDetails = accountDetails;
    component.accountDetails.firstName = '';

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#personal-data-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the button when the form is valid', () => {
    const loginService = TestBed.inject(LoginService);
    spyOn(loginService, 'getEmail').and.returnValue(accountDetails.email);
    component.accountDetails = accountDetails;

    fixture.detectChanges();

    expect(loginService.getEmail).toHaveBeenCalled();

    const button = fixture.debugElement.query(By.css('#personal-data-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeFalsy();
  });
});
