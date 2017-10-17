import { Component, OnInit, OnChanges } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private LoginService: LoginService, private UserService: UserService) { }

  isAuthenticated = false;

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.isAuthenticated = true;
      this.navItems = this.protectedRoutes;
    }
    this.LoginService.getLoginData().subscribe(d => {
        this.isAuthenticated = d;

        if (d === true) {
          this.navItems = this.protectedRoutes;
        } else {
          this.navItems = this.unprotectedRoutes;
        }
    });
  }

  activeLinkIndex = 0;
  protectedRoutes = [
    {name: 'Home', route: '/'},
    {name: 'Profile', route: '/profile'},
    {name: 'About', route: '/about'},
    {name: 'Logout', route: '/login'}
  ];
  unprotectedRoutes = [{
    name: 'Login', route: '/login'
  }];


  routeChanged(index) {
    this.activeLinkIndex = index;
  }
  
  navItems = this.isAuthenticated ? this.protectedRoutes : this.unprotectedRoutes;
}
