import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http:Http) { } 
  title = 'register';
  API_URL = 'http://127.0.0.1:3000/api/users';
  email = '';
  username = '';
  password = '';
  showSuccess = false;
  showError = false;


  doRegister() {
    const data = {
      email: this.email,
      username: this.username,
      password: this.password
    };

    return this.http.post(this.API_URL, data)
      .forEach(res => {
        const result = res.json();
        console.log('result', result);
        if (result.message === 'User created') {
          this.showSuccess = true;
        } else {
          this.showError = true;
        }
    });
  }
}
