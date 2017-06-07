import { Component, OnInit } from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit 
{

  public username: string
  public websocket: WebSocket;
  public messageString: string;
  public messages: string;



  constructor() 
  { 
    this.username = Cookie.get('loggedUser');
    console.log(this.username);
    this.websocket = new WebSocket('ws://localhost:8080/Kwetter/socket');

    this.websocket.onerror = function (event) {
      onError(event);
    };

    this.websocket.onmessage = function (event) {
      onMessage(event);
    };

    function onMessage(event) {
      console.log(event.data);
      document.getElementById('socket').innerHTML += '<br />' + event.data;
      //this.messages += '<br />Received message: ' + event.data;
    };

    function onError(event) {
      alert(event.data);
    };
  }

  ngOnInit() {
  }

  public send() {
    this.websocket.send(this.messageString);
    this.messageString = null;
  }

}
