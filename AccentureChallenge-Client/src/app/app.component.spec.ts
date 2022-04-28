import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';

import { routes } from './app-routing.module';
import { CountryService } from './services/country.service';
import { Router } from '@angular/router';
import { SignInGuard } from './guards/signinguard';
import { AuthGaurd } from './guards/authguard';
import { Location } from '@angular/common';

describe('AppComponent', () => {
  let router: Router;
  let component: AppComponent;
  let debugElement: DebugElement;
  let location: Location;
  let countryService: CountryService;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [CountryService, SignInGuard, AuthGaurd]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    countryService = TestBed.inject(CountryService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should test navigatation to default route', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement;
    router.initialNavigation();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('');
    });
  }));
});
