import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx'; //volgens mij zou die hier boven al moeten werken.. maar doettie niet
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Kweet } from "app/models/Kweet";


@Injectable()
export class KweetService {

  private globalUrl = 'http://localhost:8080/KweetRestMicroservice/';

  constructor(private http: Http) {
  }

    public getRecent(username: string): Observable<any[]> {
    const endPoint = 'resources/kweet/recent/' + username;
    const url = this.globalUrl + endPoint;
    return this.getRequest(url);
  }

    public getAll(username: string): Observable<any[]> {
    const endPoint = 'resources/kweet/all/' + username;
    const url = this.globalUrl + endPoint;
    return this.getRequest(url);
  }

    public getKweetByMessage(content: string): Observable<Kweet[]> {
    const endPoint = 'resources/kweet/search/' + content;
    const url = this.globalUrl + endPoint;
    return this.getRequest(url);
  }

    public createKweet(username: string, message: string):  Observable<Kweet> {
    const endPoint = 'resources/kweet/create/';
    const url = this.globalUrl + endPoint;
    let body = 'username=' + username + '&message=' + message;
    return this.postRequest(url, body);
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