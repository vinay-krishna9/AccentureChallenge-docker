import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGaurd implements CanActivate {

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    const token = localStorage.getItem('isLogin');

    if(token){
      return true;
    }
    this.router.navigate(['login']);
     return false;
  }
}
