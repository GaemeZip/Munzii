import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard#canActivate called');
    if (localStorage.user == 'true') {
      console.log(localStorage.passwordState, '비번 상태');

      if (localStorage.passwordState == 'true') {
        localStorage.passwordMode = 'enter';
        this.router.navigate(['/password-input']);
        return false;
      }
      this.router.navigate(['/home']);
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
