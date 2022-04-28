import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { Country } from '../country.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  country: Country;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: CountryService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
      this.service.getCountryById(id).subscribe(res => {
        this.country = res['data'];
      });
  }

  getRank(e) {
    return e < '20'
      ? {
          rank: 'Good',
          desc: 'Air quality is satisfactory, and air pollution poses little or no risk.',
        }
      : e < '40' && e >= '20'
      ? {
          rank: 'Moderate',
          desc: 'Air quality is satisfactory, and air pollution poses little or no risk.',
        }
      : e < '60' && e >= '40'
      ? {
          rank: 'Unhealthy',
          desc: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
        }
      : e < '80' && e >= '60'
      ? {
          rank: 'Very Unhealthy',
          desc: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
        }
      : {
          rank: 'Hazardous',
          desc: 'Health warning of emergency conditions: everyone is more likely to be affected.',
        };
  }
}
