import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, RouterModule} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RouteguardGuard implements CanActivate {
  isLoggedIn = false;


  constructor(public tokenStorageService: TokenStorageService, public router: Router) {
  }

  canActivate(): boolean {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      return true;
    }
    this.router.navigate(['login']);
    return false;

  }
}

