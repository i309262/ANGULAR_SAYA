// import { Injectable } from '@angular/core';
// import {User} from "../models/User";
// import {CookieService} from "angular2-cookie/services/cookies.service";
// import {Router} from "@angular/router";
// import { Observable } from "rxjs/Observable";
// import 'rxjs/Rx'; //volgens mij zou die hier boven al moeten werken.. maar doettie niet
// import { Http, Response, RequestOptions, Headers } from "@angular/http";

// @Injectable()
// export class LoginService {

//   private loggedInUser: User = null;
//   public isLoggedIn: boolean = false;

//   private globalUrl = 'http://localhost:8080/Kwetter/';

//   constructor(private cookie: CookieService, private http: Http, private router: Router) {
//     this.loggedInUser = <User>this.cookie.getObject("loggedInUser");
//     this.isLoggedIn =  (this.loggedInUser != null);
//   }

//   LogIn(userName, password){
//     this.http.get(this.globalUrl + '/user/byname/' + userName).subscribe(
//       (response)=> {
//         this.loggedInUser = response.json();
//         console.log(this.loggedInUser);
//         this.cookie.putObject("loggedInUser", this.loggedInUser);
//         this.isLoggedIn = true;
//       }, (error)=> {
//         this.loggedInUser = null;
//         this.cookie.remove("loggedInUserId");
//         this.isLoggedIn = false;
//       }
//     );
//   }


//     public inloggen(name: string, wachtwoord: string):  Observable<any> {
//     const endPoint = 'resources/user/login/';
//     const url = this.globalUrl + endPoint;
//     let body = 'username=' + name + '&password=' + wachtwoord;
//     return this.postRequest(url, body);
//   }

//   private getRequest(url: string): any {
//     let headers = new Headers({
//       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//     });
//     return this.http.get(url, { headers: headers })
//       .map((res: Response) => res.json())
//       .catch(this.handleError);
//   }

//   private postRequest(url: string, body: string) {
//     let headers = new Headers({
//           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//         });
//         return this.http.post(url, body, { headers: headers })
//           .map((res: Response) => res.json())
//           .catch(this.handleError);
//   }

//   private handleError(error: any): Observable<any> {
//     console.error('An error occurred', error);
//     return Observable.throw(error.message || error);
//   }
// }
