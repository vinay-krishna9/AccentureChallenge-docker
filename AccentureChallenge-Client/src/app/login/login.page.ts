import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../services/country.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginData: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CountryService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.loginData = this.fb.group({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ])
      ),
    });
  }

  login() {
    this.service.login(this.loginData.value).subscribe(
      (res) => {
        localStorage.setItem('isLogin', btoa(res['token']));
        this.loginData.reset();
        this.router.navigate(['home']);
      },
      (err) => {
        this.alertController.create({
          header: 'Error',
          message: err.error.message || '',
          buttons: ['OK']
        }).then(res => {
          res.present();
        });
      }
    );
  }
}
