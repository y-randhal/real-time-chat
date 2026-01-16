import { Component, inject } from '@angular/core';
import { ChatService } from './services/chat';
import { DatePipe, NgClass } from '@angular/common';
import { Sidebar } from './components/sidebar/sidebar';


@Component({
  selector: 'app-root',
  imports: [DatePipe, Sidebar, NgClass],
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