import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat';

@Component({
  selector: 'sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  public rooms = ['Geral', 'TypeScript', 'Vagas'];

  constructor(public chatService: ChatService) {}

}
