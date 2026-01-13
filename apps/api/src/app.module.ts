import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './app/chat.gateway';

@Module({
  imports: [ChatGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
