import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx'; //volgens mij zou die hier boven al moeten werken.. maar doettie niet
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { User } from "app/models/User";


@Injectable()
export class UserService {

  private loggedInUser: User = null;
  public isLoggedIn: boolean = false;

  private globalUrl = 'http://localhost:8080/Kwetter/';

  constructor(private http: Http) {
  }
  //constructor() {}

  public getAll(): Observable<User[]> {
    const endPoint = 'resources/user/all';
    const url = this.globalUrl + endPoint;
    return this.getRequest(url);
  }

  public getUserByName(name: string): Observable<any> {
    const endPoint = 'resources/user/' + name;
    const url = this.globalUrl + endPoint;
    return this.getRequest(url);
  }

  public getFollowing(name:string): Observable<any> {
    const endPoint = 'resources/user/following/' + name;
    const url = this.globalUrl + endPoint;
    return this.getRequest(url);
  }

  public getFollowers(name:string): Observable<any> {
    const endPoint = 'resources/user/followers/' + name;
    const url = this.globalUrl + endPoint;
    return this.getRequest(url);
  }

  public inloggen(name: string, wachtwoord: string):  Observable<any> {
    const endPoint = 'resources/user/login/';
    const url = this.globalUrl + endPoint;
    let body = 'username=' + name + '&password=' + wachtwoord;
    return this.postRequest(url, body);
  }

  public editUser(username: string, name: string, locatie: string, website: string, bio: string):  Observable<User> {
    const endPoint = 'resources/user/edituser/';
    const url = this.globalUrl + endPoint;
    let body = 'username=' + username + '&name=' + name + '&locatie=' + locatie + '&website=' + website + '&bio=' + bio;
    return this.postRequest(url, body);
  }

  public followUser(follower: string, leader: string):  Observable<User> {
    const endPoint = 'resources/user/follow/';
    const url = this.globalUrl + endPoint;
    let body = 'follower=' + follower + '&leader=' + leader;
    return this.postRequest(url, body);
  }

  //   LogIn(userName, password){
  //   this.http.get(this.globalUrl + '/user/byname/' + userName).subscribe(
  //     (response)=> {
  //       this.loggedInUser = response.json();
  //       console.log(this.loggedInUser);
  //       this.cookie.putObject("loggedInUser", this.loggedInUser);
  //       this.isLoggedIn = true;
  //     }, (error)=> {
  //       this.loggedInUser = null;
  //       this.cookie.remove("loggedInUserId");
  //       this.isLoggedIn = false;
  //     }
  //   );
  // }

  private getRequest(url: string): any {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    return this.http.get(url, { headers: headers })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private postRequest(url: string, body: string) {
    let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        });
        return this.http.post(url, body, { headers: headers })
          .map((res: Response) => res.json())
          .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

}