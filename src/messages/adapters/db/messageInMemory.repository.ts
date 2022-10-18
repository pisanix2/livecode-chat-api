import { Injectable } from '@nestjs/common';
import { Message } from 'src/messages/domain/model/message.model';
import { MessageRepository } from 'src/messages/domain/ports/message.repository';

@Injectable()
export class MessageInMemory implements MessageRepository {
  private readonly messages: Message[] = [];

  create(message: Message): Message {
    this.messages.push(message);
    return message;
  }

  findAll(): Message[] {
    return this.messages;
  }

  findByUser(user: string): Message[] {
    return this.messages.filter(
      (el) => el.origin.id === user || el.destination.id === user,
    );
    // .sort((a, b) => new Date(a.createdAt) - new Date(b.createAt));
  }
}
