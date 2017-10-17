import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http:Http,
     private router: Router,
     private LoginService: LoginService,
     private UserService: UserService) { }


  title = 'Login';
  API_URL = 'http://127.0.0.1:3000/api/user/login';
  email = '';
  username = '';
  password = '';

  ngOnInit() {
    this.LoginService.logout();
  }

  onSubmit() {
    const data = {
      email: this.email,
      password: this.password
    };

    return this.http.post(this.API_URL, data)
      .forEach(res => {
        const result = res.json();
        if (result.user) {
          console.log('result', result);
          this.LoginService.login();          
          this.UserService.saveUser(result.user);
          this.router.navigate(['/']);
        }
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
