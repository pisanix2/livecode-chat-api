import { Inject, Injectable } from '@nestjs/common';
import { Message } from '../model/message.model';
import { MessageRepository } from './message.repository';
import { ContactRepository } from './contact.repository';
import { SocketService } from './socket.service';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MessageRepository)
    private readonly messageRepository: MessageRepository,
    @Inject(ContactRepository)
    private readonly contactRepository: ContactRepository,
    @Inject(SocketService)
    private readonly socketService: SocketService,
  ) {}

  create(
    content: string,
    contactOrigin: string,
    contactDestination: string,
  ): Message {
    const origin = this.contactRepository.findById(contactOrigin);
    const destination = this.contactRepository.findById(contactDestination);

    const message = new Message(content, origin, destination);
    this.messageRepository.create(message);

    this.socketService.notifyNewMessage(destination.id, content);

    return message;
  }

  findAll(): Message[] {
    return this.messageRepository.findAll();
  }

  findByUser(userLoginId: string, userContactId: string): Message[] {
    return this.messageRepository.findByUser(userLoginId, userContactId);
  }
}
