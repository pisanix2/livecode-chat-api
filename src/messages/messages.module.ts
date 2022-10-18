import { Module } from '@nestjs/common';
import { SocketService } from './domain/ports/socket.service';

import { MessageController } from './adapters/api/message.controller';
import { MessageRepository } from './domain/ports/message.repository';
import { MessageInMemory } from './adapters/db/messageInMemory.repository';
import { MessageService } from './domain/ports/message.service';

import { ContactController } from './adapters/api/contact.controller';
import { ContactRepository } from './domain/ports/contact.repository';
import { ContactInMemory } from './adapters/db/contactInMemory.repository';
import { ContactService } from './domain/ports/contact.service';

@Module({
  controllers: [MessageController, ContactController],

  providers: [
    SocketService,
    MessageService,
    {
      provide: MessageRepository,
      useClass: MessageInMemory, // can add condition on ENV, inject mock impl for unit testing
    },
    ContactService,
    {
      provide: ContactRepository,
      useClass: ContactInMemory, // can add condition on ENV, inject mock impl for unit testing
    },
  ],
})
export class MessagesModule {}
