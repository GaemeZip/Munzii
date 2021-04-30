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
    if (localStorage.user == 'true') {
console.log(localStorage.passwordState, "패스워드 상태");
      if (localStorage.passwordState == 'true') {
        this.router.navigate(['/password-enter']);
        return false;
      }
      this.router.navigate(['/home']);
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
