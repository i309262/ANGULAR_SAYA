import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { StartPageComponent } from './start-page/start-page.component';
import {KweetService} from "./services/kweet.service";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'user',
        component: UserComponent
      }
     ])
  ],
  providers: [KweetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
