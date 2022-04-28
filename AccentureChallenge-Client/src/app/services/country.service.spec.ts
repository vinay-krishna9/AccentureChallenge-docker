import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { CountryService } from './country.service';

describe('CountryService', () => {
  let injector: TestBed;
  let service: CountryService;
  let httpMock: HttpTestingController;
  const dummyToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVlYWZiMzc4Mzk3NzJhOWZmNWJhNDAiLCJpYXQiOjE2NTA0Njc4OTZ9.mkkR00cNvl3PhxNoAyoRozatUMkMxcdvwVIUR2tr1Qw';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [CountryService],
    });
    injector = getTestBed();
    service = injector.inject(CountryService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return a token', () => {
    const user = {
      email: 'testing1@gmail.com',
      password: 'qweRTY123$%^',
    };

    service.login(user).subscribe((res) => {
      expect(res).toEqual(dummyToken);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}user/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyToken);
  });

  it('should return a error message', () => {
    const user = {
      email: 'testing1@gmail.com',
      password: 'wrong-password',
    };

    const dummyMessage =
      'Incorrect Credentials';

    service.login(user).subscribe((res) => {
      expect(res).toEqual(dummyMessage);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}user/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyMessage);
  });

  it('should return list of countries', () => {
    const pageNo = 1;
    const dummyList = [
      {
        city: 'Kabul',
        region: 'Kabul',
        country: 'Afghanistan',
        airQuality: '18.42105263',
        population: '39074280',
        flag: 'https://flagcdn.com/w160/af.png'
      },
      {
        city: 'Kabul1',
        region: 'Kabul1',
        country: 'Afghanistan1',
        airQuality: '68.421052631',
        population: '12074280',
        flag: 'https://flagcdn.com/w160/af.png'
      }
    ];

    service.getAllCountries(pageNo).subscribe((res) => {
      expect(res).toEqual(dummyList);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}country/aqi?page=${pageNo}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyList);
  });

  it('should return details of a country for selected Id', () => {
    const id = '625afdd7bf74ece411fd1395';
    const dummyCountry = [
      {
        id: '625afdd7bf74ece411fd1395',
        city: 'Kabul',
        region: 'Kabul',
        country: 'Afghanistan',
        airQuality: '18.42105263',
        population: '39074280',
        flag: 'https://flagcdn.com/w160/af.png'
      }
    ];

    service.getCountryById(id).subscribe((res) => {
      expect(res).toEqual(dummyCountry);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}country/aqiById?aqiId=${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCountry);
  });
});
