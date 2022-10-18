import { Inject, Injectable } from '@nestjs/common';
import { Message } from '../model/message.model';
import { MessageRepository } from './message.repository';
import { ContactRepository } from './contact.repository';

@Injectable()
export default class MessageService {
  constructor(
    @Inject(MessageRepository)
    private readonly messageRepository: MessageRepository,
    @Inject(ContactRepository)
    private readonly contactRepository: ContactRepository,
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
    return message;
  }

  findAll(): Message[] {
    return this.messageRepository.findAll();
  }

  findByUser(userLoginId: string, userContactId: string): Message[] {
    return this.messageRepository.findByUser(userLoginId, userContactId);
  }
}
