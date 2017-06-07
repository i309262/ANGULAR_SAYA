import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";
import {CookieService} from "angular2-cookie/services/cookies.service";

import { AppComponent } from './app.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import {KweetService} from "./services/kweet.service";
import {UserService} from "./services/user.service";
import { LoginComponent } from './components/login/login.component';
import { OtherProfileComponent } from './components/other-profile/other-profile.component';
import { WebSocketComponent } from './components/web-socket/web-socket.component';


@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    LoginComponent,
    OtherProfileComponent,
    WebSocketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'otherprofile',
        component: OtherProfileComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        component: StartPageComponent
      },
            {
        path: 'websocket',
        component: WebSocketComponent
      }
     ])
  ],
  providers: [KweetService, UserService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
