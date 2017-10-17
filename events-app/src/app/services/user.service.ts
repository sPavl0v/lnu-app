import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';

const USER_DATA_URL = 'http://127.0.0.1:3000/api/user';
const LIKE_API_URL = 'http://127.0.0.1:3000/api/events/like';

@Injectable()
export class UserService {
  constructor(public http: Http) {
    
  } 
  API_URL = 'http://127.0.0.1:3000/api/user/login';
  
  public userData = new Subject<any>();
  public cachedUser = {} as any;
  // userData = {};

  saveUser(user) {
    localStorage.setItem('email', user.email);
    localStorage.setItem('password', user.password);

    this.setUserData(user)
  }


  // TODO: Finish this method
  subscribe(eventID) {
    return this.http.put(USER_DATA_URL, eventID)
      .forEach(res => {
        if (res.json().message === 'Success') {
          // this.userData.next(res.json().user);
        }
      });
  }

  setUserData(data: any) {
    console.log('set user data', data)
    this.userData.next(data);
    this.cachedUser = data;
  }

  receiveUserData(): Observable<any> {
    return this.userData.asObservable();
  }


  like(eventID) {
    return this.http.post(LIKE_API_URL, { eventID });
  }

  getUserData() {
    const data = {
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password')
    };

    return this.http
      .post(this.API_URL, data)
      .forEach(res => res.json())
      .then(result => this.setUserData(result));
  }

  doLogout() {
    this.setUserData({});
  }
}