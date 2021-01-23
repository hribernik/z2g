import { Component, OnInit } from '@angular/core';
import {SocketchatService} from '../_services/socketchat.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {

  userCount = 1;
  votes = 0;
  ytId = '';
  autoplay = 'false';
  private voted = false;
  private socket: any;

  constructor( private chatservice: SocketchatService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
   this.socket = this.chatservice.getSocket();
   this.setupVoteService();
   this.voted = false;

// for yt:

   const tag = document.createElement('script');
   tag.src = 'https://www.youtube.com/iframe_api';
   document.body.appendChild(tag);
  }

// adding eventlistners for voting

  setupVoteService(){
    this.socket.on('zapp', (data: string) => {
      this.ytId = data;
      console.log('ZAAAAPPPPPPPEEEEEDDDD');
      this.resetVoteButton();
    });
    this.socket.on('voted', (data: number) => {this.votes = data; });
    this.socket.on('usercount', (data: number) => {this.userCount = data;  });
    this.socket.on('current-status', (data: any) => {
      this.ytId = data.video;
      this.userCount = data.users;
      this.votes = data.votes;
      this.resetVoteButton();
    });

    this.socket.on('disconnect', ()=>{
      console.log('CONNECTION TO SERVER LOST');
      this.resetVoteButton();
      this.voted =false;
    })
  }

  vote(){

    if (this.userCount === 1){
      this.socket.emit('vote', this.tokenService.getUser().username);
    }
    else {

      if (!this.voted) {
        this.socket.emit('vote', this.tokenService.getUser().username);
        this.voted = true;
        document.getElementById('vote_button')!.innerHTML = ' PULL BACK! ';
        document.getElementById('vote_button')!.style.backgroundColor = '#CD491F';
      } else {
        this.unvote();
      }
    }
  }
  unvote(){
    if(this.voted) {
      this.socket.emit('unvote', this.tokenService.getUser().username);
      this.voted = false;
      this.resetVoteButton();
    }
  }


resetVoteButton(){
  document.getElementById('vote_button')!.innerHTML = ' VOTE NEXT! ';
  document.getElementById('vote_button')!.style.backgroundColor = 'snow';
  this.voted = false;
}
}




