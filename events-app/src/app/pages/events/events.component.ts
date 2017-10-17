import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import {MdDialog} from '@angular/material';

const EVENTS_LINK = 'http://127.0.0.1:3000/api/events';
const SUBSCRIBE_API_LINK = 'http://127.0.0.1:300/api/users/'
const LOGIN_API_URL = 'http://127.0.0.1:3000/api/user/login';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  constructor(public dialog: MdDialog,
    public http: Http, 
    public UserService: UserService,
    public router: Router, 
    private EventsService: EventsService
  ) {
    this.EventsService.uploadEvents();
  }

  title = 'events';
  events = [];
  user = this.UserService.userData as any;

  getEventsPageData() {
    this.EventsService.getEvents().subscribe(data => this.events = data);
    if (this.UserService.cachedUser.username) {
      this.user = this.UserService.cachedUser;
    } else { 
      this.UserService.receiveUserData().subscribe(data => {
        this.user = data;
      });
    }

  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogContentExampleDialog, {
  //     height: '350px'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }


  goToEventPage(eventID) {
    this.router.navigate([`/events/${ eventID }`]);
  }

  onSubscribeClick(eventID, index) {
    // this.events[index].
    this.user.subscription.push(eventID);
    // this.http.post(SUBSCRIBE_API_LINK, {})
    //   .forEach(res => res.json())
    //   .then(result => {

    //   });
  }

  onUnsubscribeClick(eventID) {

  }

  like(eventID, index) {
    this.UserService.like(eventID)
      .forEach(response => {
        this.events[index].likes += 1; 
      });
  }

  isSubscribed(eventID) {
    if (this.user && this.user.username) {
      return ~this.user.subscription.indexOf(eventID);      
    }
    return false;
  }

  // handleSubscribeClick() {
  //   this.
  // }

  ngOnInit() {
    console.log('events on init');
    this.getEventsPageData();
    // if (localStorage.getItem('email')) {
    //   const email = localStorage.getItem('email');
    //   const password = localStorage.getItem('password');
    //   this.http.post(LOGIN_API_URL, { email, password })
    //     .forEach(res => res.json())
    //     .then(result => this.user = result);
    // }
  }
}
