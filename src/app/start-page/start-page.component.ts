import { Component, OnInit } from '@angular/core';
import {Kweet} from "../models/Kweet";
import {User} from "../models/User"; //om te testen
import {KweetService} from "../services/kweet.service";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

public kweets = new Array<Kweet>();
public users = new Array<User>();
public object: any = null;

    constructor(private kweetService: KweetService) { }
    //constructor() { }


  ngOnInit() {
      this.getAll();
      
      console.log("test log");
  }

//  public getAll() {
//    this.kweetService.getAll().subscribe(users => {
//      users.forEach(u => {
//        this.users.push(u)
//        console.log(this.users[0].userName)
//      });
//    });
//  }
  
    public getAll() {
    this.kweetService.getAll().subscribe(users => this.object = users);
  }

}
//kankerjong