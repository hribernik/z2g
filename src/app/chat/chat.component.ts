import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {SocketchatService} from '../_services/socketchat.service';
import {TokenStorageService} from "../_services/token-storage.service";
import {Socket} from "socket.io-client";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @HostListener('window:unload', [ '$event'])
  logout(){
    this.socket.emit('unvote', this.username);
    this.socket.emit('left', this.username);
    this.chatService.disconnect();
  }


private socket: Socket;
private username: string;

  constructor(private chatService: SocketchatService, private tokenService: TokenStorageService) {

    this.socket = this.chatService.getSocket();
    this.username = this.tokenService.getUser().username;

    }



ngOnInit(): void {
  this.chatService.connect();
}

ngOnDestroy(): void{

  this.socket.emit('unvote', this.username);
  this.socket.emit('left', this.username);
  this.chatService.disconnect();
}

disconnect(){
    this.chatService.disconnect();
}

}
