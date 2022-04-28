import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CountryService } from '../services/country.service';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;
  let location: Location;
  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [CountryService],
    }).compileComponents();
  }));

  it('should create the login page', waitForAsync(() => {
    fixture = TestBed.createComponent(HomePage);
    const home = fixture.debugElement.componentInstance;
    expect(home).toBeTruthy();
  }));

  it(`should have a title 'Home'`, waitForAsync(() => {
    fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const home = fixture.debugElement.nativeElement;
    expect(home.querySelector('ion-title').textContent).toContain('Home');
  }));
});
