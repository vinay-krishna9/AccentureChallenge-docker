/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ],
    }).compileComponents();
  }));

  it('should create the login page', waitForAsync(() => {
    fixture = TestBed.createComponent(LoginPage);
    const login = fixture.debugElement.componentInstance;
    expect(login).toBeTruthy();
  }));

  it(`should have a title 'Login'`, waitForAsync(() => {
    fixture = TestBed.createComponent(LoginPage);
    fixture.detectChanges();
    const login = fixture.debugElement.nativeElement;
    expect(login.querySelector('ion-title').textContent).toContain('Login');
  }));

  it('form invalid when empty', () => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.loginData.valid).toBeFalsy();
  });

  it('form validty', () => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    const email = component.loginData.controls['email'];
    const password = component.loginData.controls['password'];
    expect(email.valid && password.valid).toBeFalsy();
  });

  it('email and password validty with required', () => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    let errors = {};
    const email = component.loginData.controls['email'];
    const password = component.loginData.controls['password'];
    errors = email.errors || password.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('email validators', () => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    let errors = {};
    const email = component.loginData.controls['email'];
    email.setValue('testing');
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });

  it('password validators', () => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    let errors = {};
    const password = component.loginData.controls['password'];
    password.setValue('wqsd23');
    errors = password.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('sucessful submission', () => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    component.ngOnInit();

    expect(component.loginData.valid).toBeFalsy();

    component.loginData.controls['email'].setValue("test@test.com");
    component.loginData.controls['password'].setValue('qweRTY123$%^');
    expect(component.loginData.valid).toBeTruthy();
  });
});
