import { Module } from '@nestjs/common';
import { WsMainGateway } from './WsMainGateway';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [WsMainGateway],
  exports: [WsMainGateway, CqrsModule],
})
export class WsModule {}
