import { Component, OnInit } from '@angular/core';
import {Kweet} from "../../models/Kweet";
import {User} from "../../models/User"; //om te testen
import {KweetService} from "../../services/kweet.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.css']
})
export class OtherProfileComponent implements OnInit {

public user : User;
public kweetsObject: any = null;
public userFollowing = new Array<User>();
public userFollowers = new Array<User>();
public isSelf: Boolean;
public userBio: string;

  constructor(private kweetService: KweetService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    let selectedUsername = Cookie.get('selectedUser');
    this.checkYoSelf();
    this.getUserByName(selectedUsername);
    this.getRecentKweets(selectedUsername);
    this.getFollowers(selectedUsername);
    this.getFollowing(selectedUsername);
  }

    public getUserByName(name: string): void {
    this.userService.getUserByName(name).subscribe(u => {
      this.user = u;
      console.log(u);
      // this.userBio = this.user.bio;
    });
  }

    public getRecentKweets(username: string) {
    this.kweetService.getRecent(username).subscribe(
      (kweets) => {this.kweetsObject = kweets;});
  }

    public getFollowing(username: string): void {
    this.userService.getFollowing(username).subscribe(following => {
      following.forEach(f => {
        console.log(f);
        this.userFollowing.push(f);
      });
    });
  }

  public getFollowers(username: string): void {
    this.userService.getFollowers(username).subscribe(following => {
      following.forEach(f => {
        console.log(f);
        this.userFollowers.push(f);
      });
    });
  }

  public followUser() {
    this.userService.followUser(Cookie.get('loggedUser'), Cookie.get('selectedUser')).subscribe(leader => {
        // this.alreadyFollowing = true;
        this.userService.getFollowers(Cookie.get('selectedUser')).subscribe(followers => {
          this.userFollowers = followers;
          // this.getFollowers(Cookie.get('selectedUser'));
        });
      });
  }

  // public unfollowUser() {
  //   this.myUserService.stopVolger(sessionStorage.getItem('loggedInUserName'), sessionStorage.getItem('clickedUsername')).subscribe(leader => {
  //     this.alreadyFollowing = false;
  //     this.myUserService.getFollowers(sessionStorage.getItem('clickedUsername')).subscribe(followers => {
  //       this.UserFollowers = followers;
  //     });
  //   });
  // }


    public editUser(): void {
    this.userService.editUser(Cookie.get('selectedUser'), this.user.name, this.user.location, this.user.website,this.user.bio).subscribe(returnedJson => {
      // this.userBio = null;
      console.log('userlocatie: ' + this.user.location);
      // this.ngOnInit();
    });
  }
  

  public checkYoSelf()
  {
    if(Cookie.get('selectedUser') == Cookie.get('loggedUser'))
    {
      this.isSelf = true;
    }
    else
    {
      this.isSelf = false;
    }
  }

}
