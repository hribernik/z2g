import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketchatService {
   // @ts-ignore
  socket: Socket;

  constructor() {

  }

  connect(){
    this.socket = io(environment.ws_url, {
      secure: environment.ws_sec
    });
  }
  disconnect(){
    this.socket.disconnect();
  }

  sendMessage(message: string){
    this.socket.emit('new-message', message);
  }
  getSocket(){
    return this.socket;
  }

}
