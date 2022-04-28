import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DetailPage } from './detail.page';

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPage ],
      imports: [IonicModule.forRoot(),  RouterModule.forRoot([]), HttpClientTestingModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {params: {id: '625afdd7bf74ece411fd1411'}}
        }
      }]
    }).compileComponents();
  }));

  it('should create the login page', waitForAsync(() => {
    fixture = TestBed.createComponent(DetailPage);
    const details = fixture.debugElement.componentInstance;
    expect(details).toBeTruthy();
  }));

  // it(`should have a title 'details'`, waitForAsync(() => {
  //   fixture = TestBed.createComponent(DetailPage);
  //   fixture.detectChanges();
  //   const details = fixture.debugElement.nativeElement;
  //   expect(details.querySelector('ion-title').textContent).toContain('Home');
  // }));
});
