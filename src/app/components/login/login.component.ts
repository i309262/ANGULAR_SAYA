import { Component, OnInit } from '@angular/core';

import {User} from "../../models/User"; //om te testen
import {KweetService} from "../../services/kweet.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public name: string;
  public password: string;
  public websocket: WebSocket;

  constructor(private router: Router, private userService: UserService) {
    this.websocket = new WebSocket('ws://localhost:8080/Kwetter/socket/');
  }

  ngOnInit() {
  }

  public formProcess() {
    this.inloggen(this.name, this.password);
  }

  public inloggen(name: string, pass: string) {
    this.userService.inloggen(name, pass).subscribe(k => {
      if (k != null) {
        console.log(k);
        this.user = k;
        Cookie.set('loggedUser', name);
        //console.log(Cookie.get('loggedUser'));
        this.router.navigateByUrl(''); //<-- aanpassen    
      }
      else 
      {
        //this.router.navigateByUrl('/kweet');
        console.log('login fail');    
        Cookie.set('loggedUser', '');  
      }
    });
  }

}
