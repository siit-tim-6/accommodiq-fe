import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { RegistrationService } from './registration.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Account } from './registration.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  const expectedAccount: Account = {
    email: 'test@example.com',
    password: 'password',
    role: 'GUEST',
    user: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      phoneNumber: '1234567890',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule],
      declarations: [RegistrationComponent],
      providers: [{ provide: MessageService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'registration'`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toEqual('Registration');
  });

  it('should bind input value to component property', () => {
    const emailInput = fixture.debugElement.query(
      By.css('#email'),
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('#password'),
    ).nativeElement;
    const repeatPasswordInput = fixture.debugElement.query(
      By.css('#repeat-password'),
    ).nativeElement;
    const firstNameInput = fixture.debugElement.query(
      By.css('#first-name'),
    ).nativeElement;
    const lastNameInput = fixture.debugElement.query(
      By.css('#last-name'),
    ).nativeElement;
    const addressInput = fixture.debugElement.query(
      By.css('#address'),
    ).nativeElement;
    const phoneNumberInput = fixture.debugElement.query(
      By.css('#phone-number'),
    ).nativeElement;
    let roles: DebugElement[] = fixture.debugElement.queryAll(
      By.css('input[type="radio"]'),
    );
    roles[1].triggerEventHandler('change', { target: roles[1].nativeElement });

    emailInput.value = 'test@example.com';
    passwordInput.value = 'password';
    repeatPasswordInput.value = 'password';
    firstNameInput.value = 'John';
    lastNameInput.value = 'Doe';
    addressInput.value = '123 Main St';
    phoneNumberInput.value = '1234567890';

    emailInput.dispatchEvent(new Event('input'));
    expect(component.email).toEqual('test@example.com');

    passwordInput.dispatchEvent(new Event('input'));
    expect(component.password).toEqual('password');

    repeatPasswordInput.dispatchEvent(new Event('input'));
    expect(component.repeatPassword).toEqual('password');

    firstNameInput.dispatchEvent(new Event('input'));
    expect(component.firstName).toEqual('John');

    lastNameInput.dispatchEvent(new Event('input'));
    expect(component.lastName).toEqual('Doe');

    addressInput.dispatchEvent(new Event('input'));
    expect(component.address).toEqual('123 Main St');

    phoneNumberInput.dispatchEvent(new Event('input'));
    expect(component.phoneNumber).toEqual('1234567890');

    roles[1].nativeElement.dispatchEvent(new Event('change'));
    expect(component.selectedRole).toEqual('GUEST');
  });

  it('should display error message for invalid email', () => {
    component.email = 'invalid-email';
    fixture.detectChanges();
    const emailInput = fixture.debugElement.query(By.css('#email'));
    emailInput.triggerEventHandler('blur', null);
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(
      By.css('.p-error'),
    ).nativeElement;
    expect(errorMessage.textContent).toContain('Email is required.');
  });

  it('should not submit form with invalid data', () => {
    spyOn(component, 'registerUser');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    component.email = 'as';
    fixture.detectChanges();
    form.dispatchEvent(new Event('submit'));
    expect(component.isValidForm()).toBeFalse();
    expect(component.registerUser).not.toHaveBeenCalled();
  });

  it('should display error message when password is empty and touched', () => {
    const passwordInput = fixture.debugElement.query(
      By.css('#password'),
    ).nativeElement;
    const passwordInputNgModel = fixture.debugElement.query(By.css('#password'))
      .references['passwordInput'];

    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(passwordInputNgModel.invalid).toBeTrue();
    expect(passwordInputNgModel.touched).toBeTrue();

    const errorMessage = fixture.debugElement.query(
      By.css('.p-error'),
    ).nativeElement;
    expect(errorMessage.textContent).toContain('Password is required.');
  });

  it('should display error message when repeat password is empty and touched', () => {
    const repeatPasswordInput = fixture.debugElement.query(
      By.css('#repeat-password'),
    ).nativeElement;
    const repeatPasswordInputNgModel = fixture.debugElement.query(
      By.css('#repeat-password'),
    ).references['repeatPasswordInput'];

    repeatPasswordInput.value = '';
    repeatPasswordInput.dispatchEvent(new Event('input'));
    repeatPasswordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(repeatPasswordInputNgModel.invalid).toBeTrue();
    expect(repeatPasswordInputNgModel.touched).toBeTrue();

    const errorMessage = fixture.debugElement.query(
      By.css('.p-error'),
    ).nativeElement;
    expect(errorMessage.textContent).toContain('Repeat password is required.');
  });

  it('should display error message when first name is empty and touched', () => {
    const firstNameInput = fixture.debugElement.query(
      By.css('#first-name'),
    ).nativeElement;
    const firstNameInputNgModel = fixture.debugElement.query(
      By.css('#first-name'),
    ).references['firstNameInput'];

    firstNameInput.value = '';
    firstNameInput.dispatchEvent(new Event('input'));
    firstNameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(firstNameInputNgModel.invalid).toBeTrue();
    expect(firstNameInputNgModel.touched).toBeTrue();

    const errorMessage = fixture.debugElement.query(
      By.css('.p-error'),
    ).nativeElement;
    expect(errorMessage.textContent).toContain('First name is required.');
  });

  it('should display error message when last name is empty and touched', () => {
    const lastNameInput = fixture.debugElement.query(
      By.css('#last-name'),
    ).nativeElement;
    const lastNameInputNgModel = fixture.debugElement.query(
      By.css('#last-name'),
    ).references['lastNameInput'];

    lastNameInput.value = '';
    lastNameInput.dispatchEvent(new Event('input'));
    lastNameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(lastNameInputNgModel.invalid).toBeTrue();
    expect(lastNameInputNgModel.touched).toBeTrue();

    const errorMessage = fixture.debugElement.query(
      By.css('.p-error'),
    ).nativeElement;
    expect(errorMessage.textContent).toContain('Last name is required.');
  });

  it('should display error message when address is empty and touched', () => {
    const addressInput = fixture.debugElement.query(
      By.css('#address'),
    ).nativeElement;
    const addressInputNgModel = fixture.debugElement.query(By.css('#address'))
      .references['addressInput'];

    addressInput.value = '';
    addressInput.dispatchEvent(new Event('input'));
    addressInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(addressInputNgModel.invalid).toBeTrue();
    expect(addressInputNgModel.touched).toBeTrue();

    const errorMessage = fixture.debugElement.query(
      By.css('.p-error'),
    ).nativeElement;
    expect(errorMessage.textContent).toContain('Address is required.');
  });

  it('should display error message when phone number is empty and touched', () => {
    const phoneNumberInput = fixture.debugElement.query(
      By.css('#phone-number'),
    ).nativeElement;
    const phoneNumberInputNgModel = fixture.debugElement.query(
      By.css('#phone-number'),
    ).references['phoneNumberInput'];

    phoneNumberInput.value = '';
    phoneNumberInput.dispatchEvent(new Event('input'));
    phoneNumberInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(phoneNumberInputNgModel.invalid).toBeTrue();
    expect(phoneNumberInputNgModel.touched).toBeTrue();

    const errorMessage = fixture.debugElement.query(
      By.css('.p-error'),
    ).nativeElement;
    expect(errorMessage.textContent).toContain('Phone number is required.');
  });

  it('should call registerUser method', () => {
    const emailInput = fixture.debugElement.query(
      By.css('#email'),
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('#password'),
    ).nativeElement;
    const repeatPasswordInput = fixture.debugElement.query(
      By.css('#repeat-password'),
    ).nativeElement;
    const firstNameInput = fixture.debugElement.query(
      By.css('#first-name'),
    ).nativeElement;
    const lastNameInput = fixture.debugElement.query(
      By.css('#last-name'),
    ).nativeElement;
    const addressInput = fixture.debugElement.query(
      By.css('#address'),
    ).nativeElement;
    const phoneNumberInput = fixture.debugElement.query(
      By.css('#phone-number'),
    ).nativeElement;
    let roles: DebugElement[] = fixture.debugElement.queryAll(
      By.css('input[type="radio"]'),
    );
    roles[1].triggerEventHandler('change', { target: roles[1].nativeElement });

    emailInput.value = 'test@example.com';
    passwordInput.value = 'password';
    repeatPasswordInput.value = 'password';
    firstNameInput.value = 'John';
    lastNameInput.value = 'Doe';
    addressInput.value = '123 Main St';
    phoneNumberInput.value = '1234567890';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    repeatPasswordInput.dispatchEvent(new Event('input'));
    firstNameInput.dispatchEvent(new Event('input'));
    lastNameInput.dispatchEvent(new Event('input'));
    addressInput.dispatchEvent(new Event('input'));
    phoneNumberInput.dispatchEvent(new Event('input'));
    roles[1].nativeElement.dispatchEvent(new Event('change'));

    const registrationService =
      fixture.debugElement.injector.get(RegistrationService);
    let registerServiceSpy = spyOn(
      registrationService,
      'registerUser',
    ).and.returnValue(of(expectedAccount));
    spyOn(component, 'registerUser').and.callThrough();
    const registrationForm = fixture.debugElement.query(
      By.css('form'),
    ).nativeElement;
    registrationForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.isValidForm()).toBeTrue();
    expect(component.registerUser).toHaveBeenCalled();
    expect(registerServiceSpy).toHaveBeenCalled();
  });

  it('should validate form correctly', () => {
    const emailInput = fixture.debugElement.query(
      By.css('#email'),
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('#password'),
    ).nativeElement;
    const repeatPasswordInput = fixture.debugElement.query(
      By.css('#repeat-password'),
    ).nativeElement;
    const firstNameInput = fixture.debugElement.query(
      By.css('#first-name'),
    ).nativeElement;
    const lastNameInput = fixture.debugElement.query(
      By.css('#last-name'),
    ).nativeElement;
    const addressInput = fixture.debugElement.query(
      By.css('#address'),
    ).nativeElement;
    const phoneNumberInput = fixture.debugElement.query(
      By.css('#phone-number'),
    ).nativeElement;
    let roles: DebugElement[] = fixture.debugElement.queryAll(
      By.css('input[type="radio"]'),
    );
    roles[1].triggerEventHandler('change', { target: roles[1].nativeElement });

    emailInput.value = 'test@example.com';
    passwordInput.value = 'password';
    repeatPasswordInput.value = 'password';
    firstNameInput.value = 'John';
    lastNameInput.value = 'Doe';
    addressInput.value = '123 Main St';
    phoneNumberInput.value = '1234567890';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    repeatPasswordInput.dispatchEvent(new Event('input'));
    firstNameInput.dispatchEvent(new Event('input'));
    lastNameInput.dispatchEvent(new Event('input'));
    addressInput.dispatchEvent(new Event('input'));
    phoneNumberInput.dispatchEvent(new Event('input'));
    roles[1].nativeElement.dispatchEvent(new Event('change'));

    expect(component.isValidForm()).toBeTrue();
  });

  it('should validate password match', () => {
    const passwordInput = fixture.debugElement.query(
      By.css('#password'),
    ).nativeElement;
    const repeatPasswordInput = fixture.debugElement.query(
      By.css('#repeat-password'),
    ).nativeElement;
    passwordInput.value = 'password';
    repeatPasswordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));
    repeatPasswordInput.dispatchEvent(new Event('input'));
    expect(component.isPasswordMatch()).toBeTrue();
  });

  it('should not validate password match', () => {
    const passwordInput = fixture.debugElement.query(
      By.css('#password'),
    ).nativeElement;
    const repeatPasswordInput = fixture.debugElement.query(
      By.css('#repeat-password'),
    ).nativeElement;
    passwordInput.value = 'password1';
    repeatPasswordInput.value = 'password2';
    passwordInput.dispatchEvent(new Event('input'));
    repeatPasswordInput.dispatchEvent(new Event('input'));
    expect(component.isPasswordMatch()).toBeFalse();
  });

  it('should invalidate incorrect email formats', () => {
    const emailInput = fixture.debugElement.query(
      By.css('#email'),
    ).nativeElement;
    const invalidEmails = ['test@example', 'testexample.com', 'test@.com'];
    invalidEmails.forEach((email) => {
      emailInput.value = email;
      emailInput.dispatchEvent(new Event('input'));
      expect(component.isEmailValid()).toBeFalse();
    });
  });

  it('should invalidate incorrect phone number formats', () => {
    const invalidPhoneNumbers = ['12345.', 'abcde12345', '+1234567890'];
    invalidPhoneNumbers.forEach((phone) => {
      component.phoneNumber = phone;
      expect(component.isPhoneValid()).toBeFalse();
    });
  });

  it('should not submit form with incomplete data', () => {
    const emailInput = fixture.debugElement.query(
      By.css('#email'),
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('#password'),
    ).nativeElement;

    emailInput.value = 'test@example.com';
    passwordInput.value = 'password';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    spyOn(component, 'registerUser');
    const registrationForm = fixture.debugElement.query(
      By.css('form'),
    ).nativeElement;
    registrationForm.dispatchEvent(new Event('submit'));
    expect(component.registerUser).not.toHaveBeenCalled();
  });
});
