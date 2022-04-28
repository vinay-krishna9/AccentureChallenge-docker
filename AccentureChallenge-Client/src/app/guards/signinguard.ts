import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class SignInGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    const token = localStorage.getItem('isLogin');

    if(token){
      this.router.navigate(['home']);
      return false;
    }
     return true;
  }
}
