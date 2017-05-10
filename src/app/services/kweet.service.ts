import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx'; //volgens mij zou die hier boven al moeten werken.. maar doettie niet
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Kweet } from "app/models/Kweet";
import { User } from "app/models/User"; //om te testen


@Injectable()
export class KweetService {

  private globalUrl = 'http://localhost:8080/Kwetter/';

  constructor(private http: Http) {
  }
  //constructor() {}

//tijdelijk met user om te testen, de kweet rest ligt in puin
  public getAll(): Observable<User[]> {
    const endPoint = 'resources/user/all';
    const url = this.globalUrl + endPoint;
    return this.getRequest(url);
  }

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