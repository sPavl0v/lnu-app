import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class LoginService {
  constructor(public http: Http) {}

  private isAuthenticated = new Subject<boolean>();

  login() {
    this.setAuthData(true);
  }

  setAuthData(value: boolean) {
    this.isAuthenticated.next(value);
  }
  
  getLoginData(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  logout() {
    localStorage.clear();
    this.setAuthData(false)
  }
}