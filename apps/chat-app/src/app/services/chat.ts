import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { io, Socket } from 'socket.io-client';
import { MessagePayload } from '@real-time-chat/shared-models';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private platformId = inject(PLATFORM_ID);
  private socket?: Socket;
  
  public messages = signal<MessagePayload[]>([]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.socket = io('http://localhost:3000');

      this.socket.on('newMessage', (msg: MessagePayload) => {
        this.messages.update(prev => [...prev, msg]);
      });
    }
  }

  send(content: string) {
    const msg: MessagePayload = {
      author: 'Angular Expert', 
      content,
      timestamp: new Date().toISOString(),
      room: 'geral'
    };
    this.socket?.emit('sendMessage', msg);
  }
}