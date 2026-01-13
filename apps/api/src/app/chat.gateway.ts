import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import type { MessagePayload } from '@real-time-chat/shared-models';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  public server!: Server;

  afterInit() {
    console.log('Chat Gateway inicializado');
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() payload: MessagePayload): void {
    const server = this.server;
    if (server) {
      server.emit('newMessage', payload);
    }
  }
}
