import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { io, Socket } from 'socket.io-client';
import { MessagePayload } from '@real-time-chat/shared-models';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private platformId = inject(PLATFORM_ID);
  private socket?: Socket;
  
  public messages = signal<MessagePayload[]>([]);
  public currentRoom = signal<string>('geral');
  public username = signal<string>('');
  public isJoined = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.socket = io('http://localhost:3000');

      this.socket.on('newMessage', (msg: MessagePayload) => {
        this.messages.update(prev => [...prev, msg]);
      });
    }
  }

  joinRoom(room: string, user: string) {
    this.messages.set([]); // Limpa as mensagens da sala anterior no UI
    this.currentRoom.set(room);
    this.username.set(user);
    this.isJoined.set(true);
    this.socket?.emit('joinRoom', { room, user });
  }
  
  send(content: string) {
    const msg: MessagePayload = {
      author: this.username(),
      content,
      timestamp: new Date().toISOString(),
      room: this.currentRoom() // Usa o valor do signal da sala atual
    };
    this.socket?.emit('sendMessage', msg);
  }
}