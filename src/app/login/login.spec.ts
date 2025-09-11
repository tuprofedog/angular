import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideZonelessChangeDetection(),
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: 'PLATFORM_ID', useValue: 'browser' }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate empty form', () => {
    component.form.setValue({ email: '', password: '' });
    expect(component.form.valid).toBeFalse();
  });

  it('should show error message for required email', () => {
    component.form.controls.email.setValue('');
    component.form.controls.email.markAllAsTouched();
    component.updateErrorMessage();
    expect(component.form.controls.email.invalid).toBeTrue();
    expect(component.emailMessage()).toEqual('You must enter an email');
  });

  it('should show error message for required password', () => {
    component.form.controls.password.setValue('');
    component.form.controls.password.markAllAsTouched();
    component.updateErrorMessage();
    expect(component.form.controls.password.invalid).toBeTrue();
    expect(component.passwordMessage()).toEqual('You must enter a password');
  });

  it('should require valid email', () => {
    component.form.controls.email.setValue('invalid-email');
    component.form.controls.email.markAllAsTouched();
    component.updateErrorMessage();
    expect(component.form.controls.email.invalid).toBeTrue();
    expect(component.emailMessage()).toEqual('Not a valid email');
  });

  it('should require password with min length', () => {
    component.form.controls.password.setValue('123');
    component.form.controls.password.markAllAsTouched();
    component.updateErrorMessage();
    expect(component.form.controls.password.invalid).toBeTrue();
    expect(component.passwordMessage()).toEqual('Minimun 6 characters');
  });

  it('should toggle password visibility', () => {
    const initial = component.hide();
    component.clickEvent(new MouseEvent('click'));
    expect(component.hide()).toBe(!initial);
  });

  it('should submit valid form and navigate', () => {
    spyOn(window.sessionStorage, 'setItem');
    component.form.setValue({ email: 'test@example.com', password: '123456' });
    component.onSubmit();
    expect(component.form.valid).toBeTrue();
    expect(window.sessionStorage.setItem).toHaveBeenCalledTimes(2);
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('user_id', 'fake-user-id');
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('access_token', jasmine.any(String));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not submit invalid form and show snackbar', () => {
    component.form.setValue({ email: '', password: '' });
    component.onSubmit();
    expect(component.form.valid).toBeFalse();
    expect(snackBarSpy.open).toHaveBeenCalledWith('Form is invalid', undefined, { duration: 3000 });
  });
});
