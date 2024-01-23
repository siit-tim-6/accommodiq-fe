import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccountComponent } from './update-account.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { By } from '@angular/platform-browser';
import { AccountService } from '../../services/account.service';
import { validAccountDetails } from '../../services/account.service.mock';
import { of } from 'rxjs';

describe('UpdateAccountComponent', () => {
  let component: UpdateAccountComponent;
  let fixture: ComponentFixture<UpdateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [UpdateAccountComponent],
      providers: [MessageService, AccountService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAccountComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAccountDetails', () => {
    const accountService = fixture.debugElement.injector.get(AccountService);
    const accountServiceSpy = spyOn(
      accountService,
      'getAccountDetails',
    ).and.returnValue(of(validAccountDetails));
    const updateDetailsSpy = spyOn(
      accountService,
      'updateAccountDetails',
    ).and.returnValue(of());

    spyOn(component, 'onUpdatePersonalData');
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(accountServiceSpy).toHaveBeenCalled();
    expect(component.accountDetails).toEqual(validAccountDetails);

    const button = fixture.debugElement.query(By.css('#personal-data-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeFalsy();
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.onUpdatePersonalData).toHaveBeenCalled();
    expect(updateDetailsSpy).toHaveBeenCalled();
  });

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
    spyOn(component, 'onUpdatePersonalData');
    component.accountDetails = validAccountDetails;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#personal-data-button'));
    expect(button).toBeTruthy(); // Check if the button element is found
    expect(button.nativeElement.disabled).toBeFalsy();

    button.nativeElement.click();

    fixture.detectChanges();

    expect(component.onUpdatePersonalData).toHaveBeenCalled();
  });
});
