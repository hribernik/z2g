import { Component, OnInit } from '@angular/core';
import {SocketchatService} from '../_services/socketchat.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-chatinbox',
  templateUrl: './chatinbox.component.html',
  styleUrls: ['./chatinbox.component.css']
})
export class ChatinboxComponent implements OnInit {

  public message = '';

  private socket: any;
  private username = '';

  constructor(private  chatService: SocketchatService , private tokenservice: TokenStorageService) {
    this.username = this.tokenservice.getUser().username;
  }

  ngOnInit(): void {
    this.socket = this.chatService.getSocket();
    this.setupChatinbox();
    this.socket.emit('join', this.username);
  }

  sendMessage(){
    this.socket.emit('message', { user: this.username, message: this.message});
    const element = document.createElement('li');
    element.className = 'self-message-item';
    element.innerHTML = '<div class="self-message-container"> <p><span style="font-weight: bold">' + this.username + '</span><br>' + this.message + '</p></div>';
    // @ts-ignore
    document.getElementById('chat-message-list').appendChild(element);
    this.message = '';
    element.scrollIntoView({behavior: 'smooth'});

  }

  // tslint:disable-next-line:typedef
  setupChatinbox(){

    //adding listeners for chat inbox;
    this.socket.on('new-user', (data: any) => {
      if (data){
        const element = document.createElement('li');
        element.className = 'join-message-item';
        element.innerHTML = '<div class="join-message-container"> <p><span style="font-weight: bold">' + data+ '</span> joined the Chat.</p></div>';
        // @ts-ignore
        document.getElementById('chat-message-list').appendChild(element);
        element.scrollIntoView({behavior: 'smooth'});
      }
    });

    this.socket.on('left', (data: any) => {
      if (data){
        const element = document.createElement('li');
        element.className = 'left-message-item';
        element.innerHTML = '<div class="left-message-container"> <p><span style="font-weight: bold">' + data+ '</span> has left the Chat.</p></div>';
        // @ts-ignore
        document.getElementById('chat-message-list').appendChild(element);
        element.scrollIntoView({behavior: 'smooth'});
      }
    });
    this.socket.on('message-broadcast', (data: any) => {
      if (data){
        const element = document.createElement('li');
        element.className = 'message-item';
        element.innerHTML = '<div class="message-container"> <p><span style="font-weight: bold">' + data.user + '</span><br>' + data.message + '</p></div>';
        // @ts-ignore
        document.getElementById('chat-message-list').appendChild(element);
        element.scrollIntoView({behavior: 'smooth'});
      }
    });
  }



}
