import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from './user.service';
import { Subscription, Subject, Observable } from 'rxjs';

const USER_DATA_URL = 'http://127.0.0.1:3000/api/user';
const EVENTS_LINK = 'http://127.0.0.1:3000/api/events';

// TODO: Fix logic
@Injectable()
export class EventsService {
  constructor(private http: Http) { } 
 // , public UserService: any
  events = new Subject<any[]>();

  uploadEvents() {
    this.http
    .get(EVENTS_LINK)
    .forEach(res => {
      console.log('setEvents(this.events)', res.json());
      this.setEvents(res.json());
    });
  }

  setEvents(newEvents: any) {
    this.events.next(newEvents);
  }

  getEvents(): Observable<any[]> {
    return this.events.asObservable();
  }

  subscribeOnEvent(eventID: string) {
    const data = {
      eventID,
      userID: 0 //this.userData.userID
    };

    return this.http.put(USER_DATA_URL, data)
      .forEach(res => console.log('res', res));
  }
}