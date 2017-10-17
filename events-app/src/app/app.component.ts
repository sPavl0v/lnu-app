import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { EventsService } from './services/events.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

const  LOGIN_API_URL = 'http://127.0.0.1:3000/api/user/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(
    private http: Http,
    private UserService: UserService,
    private LoginService: LoginService,
    private router: Router,
    private EventsService: EventsService
  ) { }

  dataReceived: boolean = false;
  user = this.UserService.userData as any;

  ngOnInit() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    console.log('this.router', this.router.url);
    if (email && password) {
      this.LoginService.login();
      this.http.post(LOGIN_API_URL, { email, password })
      .forEach(response => {
        const result = response.json();
        if (result.user) {
          this.UserService.saveUser(result.user);
          this.UserService.setUserData(result.user);
          this.EventsService.uploadEvents();
        }
      })
    }
  }

  title = 'app';
}
