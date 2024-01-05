import { Injectable } from '@angular/core';
import { environment } from '../../../env/env';
import { JwtService } from '../auth/jwt.service';
import { Message } from './web-sockets.model';

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class WebSockets {
  private serverUrl = environment.apiHost + 'socket';
  private stompClient: Stomp.Client | undefined;
  private isLoaded: boolean = false;

  constructor(
    private jwtService: JwtService,
    private messageService: MessageService,
  ) {
    alert('WebSockets constructor');
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    if (this.isLoaded) return;
    this.disconnect();
    this.isLoaded = true;

    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.openSocket();
    });
  }

  openSocket() {
    this.stompClient!.subscribe(
      '/socket-publisher/' + this.jwtService.getUserId(),
      (message: { body: string }) => {
        this.handleResult(message);
      },
    );
  }

  handleResult(message: { body: string }) {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      this.messageService.add({
        id: 'notification-toast',
        severity: 'info',
        summary: 'New Notification',
        detail: messageResult.text,
      });
    }
  }

  disconnect() {
    this.isLoaded = false;
    if (this.stompClient !== undefined) {
      this.stompClient!.disconnect(() => {});
    }
  }
}
