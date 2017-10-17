import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {
  constructor(private UserService: UserService) {

  }

  title = 'profile';
  user = {} as any;
  //subscription 
  arr = [{
    title: 'title1',
    description: 'desc 1'
  }, {
    title: 'title2',
    description: 'desc 2'
  }, {
    title: 'title3',
    description: 'desc 3'
  }, {
    title: 'title4',
    description: 'desc 4'
  }];
  subscription = this.arr;

  ngOnChanges() {
    // console.log('user on changes', this.user);
  }

  ngOnInit() {
    console.log('on init profile');
    console.log('this.user', this.user);
    if (this.UserService.cachedUser.username) {
      this.user = this.UserService.cachedUser;
    } else {
      this.UserService.receiveUserData().subscribe(data => {
        console.log('profile.user.dayta', data);
        this.user = data
      });
    }
  }
}
