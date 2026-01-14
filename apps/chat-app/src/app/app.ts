import { Component, inject } from '@angular/core';
import { ChatService } from './services/chat';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public chatService = inject(ChatService);

  join(username: string, room: string) {
    if (username.trim() && room.trim()) {
      this.chatService.joinRoom(room, username);
    }
  }

  send(input: HTMLInputElement) {
    if (input.value.trim()) {
      this.chatService.send(input.value);
      input.value = '';
    }
  }
}