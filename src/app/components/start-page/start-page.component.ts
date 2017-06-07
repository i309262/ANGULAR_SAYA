import { Component, OnInit } from '@angular/core';
import {Kweet} from "../../models/Kweet";
import {User} from "../../models/User"; //om te testen
import {KweetService} from "../../services/kweet.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

public kweets = new Array<Kweet>();
public users = new Array<User>();
public user : User;

public kweetsObject: any = null;
public usersObject: any = null;
public userObject: any = null;
public foundKweets: any;
public userFollowing = new Array<User>();
public userFollowers = new Array<User>();
public searchString: string;
public kweetMessage: string;

public websocket: WebSocket;

    constructor(private kweetService: KweetService, private userService: UserService, private router: Router) 
    { 
      this.websocket = new WebSocket('ws://localhost:8080/Kwetter/socket');

      this.websocket.onmessage = function (event) 
      {
        onMessage(event);
      };

      function onMessage(event) 
      {
        console.log(event.data);
        document.getElementById('socket').innerHTML += '<br />' + event.data;
        //this.messages += '<br />Received message: ' + event.data;
      };
    }


  ngOnInit() 
  {
    if(Cookie.get('loggedUser') != null || Cookie.get('loggedUser') != '')
    {
      console.log(Cookie.get('loggedUser'));
      // this.showUser(Cookie.get('loggedUser'));
      this.getAllKweets(Cookie.get('loggedUser'));
      this.getFollowing(Cookie.get('loggedUser'));
      this.getFollowers(Cookie.get('loggedUser'));
      this.getAllUser();
    }
  }

  
  public getRecentKweets(username: string) {
    this.kweetService.getRecent(username).subscribe(
      (kweets) => {this.kweetsObject = kweets;});
  }

  public getAllKweets(username: string) {
    this.kweetService.getAll(username).subscribe(
      (kweets) => 
      {
        console.log('getAllKweets: ' + kweets);
        this.kweetsObject = kweets;
      });
  }

  public getAllUser() {
    this.userService.getAll().subscribe(
      (users) => 
      {
        console.log('getAllUsers: ' + users);
        this.usersObject = users;
      });
  }

  public visitProfile(username: string): void {
    console.log('username clicked:' + username);
    Cookie.set('selectedUser', username);
    this.router.navigateByUrl('/otherprofile');
  }

  public showUser(name: string) {
    this.userService.getUserByName(name).subscribe(user => this.userObject = user);
  }

  public searchKweet(): void {
    this.kweetService.getKweetByMessage(this.searchString).subscribe(foundKweets => {
      console.log(foundKweets);
      this.kweetsObject = foundKweets;
    });
  }


  public createKweet(): void {
    this.kweetService.createKweet(Cookie.get('loggedUser'), this.kweetMessage).subscribe(returnedJson => {
      console.log('ceatekweet: ' + returnedJson);
      this.kweetMessage = null;
      this.ngOnInit();
    });
  }

  public getUserByName(name: string): void {
    this.userService.getUserByName(name).subscribe(u => {
      console.log('getUserByName: ' + u);
      this.user = u;
      // if (this.user.kweets && this.user.kweets[this.user.kweets.length - 1])
      //   this.lastKweet = this.user.kweets[0];
      // this.getTimelineKweets();
    });
  }

    public getFollowing(name: string): void {
    this.userService.getFollowing(name).subscribe(following => {
      following.forEach(f => {
        console.log('getFollowing: ' + f);
        this.userFollowing.push(f);
      });
    });
  }

  public getFollowers(name: string): void {
    this.userService.getFollowers(name).subscribe(following => {
      following.forEach(f => {
        console.log('getFollowers: ' + f);
        this.userFollowers.push(f);
      });
    });
  }

}