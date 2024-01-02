import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../env/env';
import { JwtService } from '../auth/jwt.service';
import { Message } from './web-sockets.model';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebSockets {
  private serverUrl = environment.apiHost + 'socket';
  private stompClient: any;
  form!: FormGroup;
  userForm!: FormGroup;

  constructor(private jwtService: JwtService) {}

  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe(
        '/socket-publisher',
        (message: { body: string }) => {
          this.handleResult(message);
        },
      );
    }
  }

  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe(
        '/socket-publisher/' + this.userForm.value.fromId,
        (message: { body: string }) => {
          this.handleResult(message);
        },
      );
    }
  }

  handleResult(message: { body: string }) {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      alert(messageResult);
    }
  }
}
