import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, HttpOptions } from '@capacitor-community/http';
import { from } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient) {}

  public login(user) {
    const url = environment.baseUrl + AppSettings.login;
    return this.http.post(url, user);
  }

  public getAllCountries(page) {
    const url = environment.baseUrl + AppSettings.getAllCountries + `page=${page}`;
    const token = atob(localStorage.getItem('isLogin'));
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    };
    return this.http.get(url, httpOptions);
  }

  public getCountryById(id) {
    const url = environment.baseUrl + AppSettings.getCountryById + `aqiId=${id}`;
    const token = atob(localStorage.getItem('isLogin'));
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    };
    return this.http.get(url, httpOptions);
  }
}
