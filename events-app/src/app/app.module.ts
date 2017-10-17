import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router';
import { HttpModule }    from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent }      from './app.component';
import { LoginComponent }    from './pages/login/login.component';
import { EventsComponent }   from './pages/events/events.component';
import { AboutComponent }    from './pages/about/about.component';
import { HeaderComponent }   from './header/header.component';
import { FooterComponent }   from './footer/footer.component';
import { ProfileComponent }  from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventComponent }    from './pages/event/event.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule, 
  MdCheckboxModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatDialogModule,
  MatButtonModule } from '@angular/material';

import { UserService }   from './services/user.service';
import { LoginService }  from './services/login.service';
import { EventsService } from './services/events.service';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventsComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ProfileComponent,
    RegisterComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MatTabsModule,
    MdCheckboxModule,
    MatInputModule,
    MatCardModule,
    MdButtonModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'about',
        component: AboutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'events/:id',
        component: EventComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        component: EventsComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  providers: [UserService, LoginService, EventsService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
