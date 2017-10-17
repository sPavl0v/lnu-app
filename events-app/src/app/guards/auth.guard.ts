import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private LoginService: LoginService) { }
  auth = false;
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('email')) {
        return true;
    }

    this.router.navigate(['/login']);
    
    return false;
    }
}