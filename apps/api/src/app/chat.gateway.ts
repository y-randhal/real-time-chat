import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagePayload, JoinRoomPayload } from '@real-time-chat/shared-models';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer() server!: Server;
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: JoinRoomPayload,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const { room, user } = data as JoinRoomPayload;
    const currentRooms = Array.from(client.rooms);
    for (const room of currentRooms) {
      if (room !== client.id) await client.leave(room);
    }

    await client.join(room);
    console.log(`Usuário ${user} entrou na sala: ${room}`);
    this.server.to(room).emit('newMessage', {
      author: 'Sistema',
      content: `${user} entrou na sala ${room}`,
      timestamp: new Date().toISOString(),
      room: room,
    });
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() payload: MessagePayload): void {
    this.server.to(payload.room).emit('newMessage', payload);
  }
}
