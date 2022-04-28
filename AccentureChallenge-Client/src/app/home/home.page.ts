import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CountryService } from '../services/country.service';
import { Country } from './country.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  countries: Country[] = [];
  page = 0;
  totalPages;

  constructor(private service: CountryService, public alertController: AlertController, private router: Router) {}

  ngOnInit() {
    this.getAllCountries();
  }

  getAllCountries(event?) {
    this.service.getAllCountries(this.page).subscribe(res => {
      this.countries = this.countries.concat(res['data']);
      this.totalPages = res['total'];
      if (event) {
        event.target.complete();
      }
    },
    (err) => {
      this.alertController.create({
        header: 'Error',
        message: err.error.message || '',
        buttons: ['OK']
      }).then(res => {
        res.present();
      });
    });
  }

  loadMoreData(event) {
    this.page++;
    this.getAllCountries(event);
    if(this.page === this.totalPages) {
      event.target.disabled = true;
    }
  }

  getRank(e) {
    return e < '20'
      ? 'Good'
      : e < '40' && e >= '20'
      ? 'Moderate'
      : e < '60' && e >= '40'
      ? 'Unhealthy'
      : e < '80' && e >= '60'
      ? 'Very Unhealthy'
      : 'Hazardous';
  }

  logout() {
    localStorage.removeItem('isLogin');
    this.router.navigate(['login']);
  }
}
