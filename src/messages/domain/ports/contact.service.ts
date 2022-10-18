import { Inject, Injectable } from '@nestjs/common';
import { Contact } from '../model/contact.model';
import { ContactRepository } from './contact.repository';
import { MessageRepository } from './message.repository';

@Injectable()
export class ContactService {
  constructor(
    @Inject(ContactRepository)
    private readonly contactRepository: ContactRepository,
    @Inject(MessageRepository)
    private readonly messageRepository: MessageRepository,
  ) {}

  create(name: string): Contact {
    const contact = new Contact(name);
    this.contactRepository.create(contact);
    return contact;
  }

  findAll(): Contact[] {
    return this.contactRepository.findAll();
  }

  findByUser(userLoginId: string): Contact[] {
    const userFetch = this.contactRepository.findAll();
    return userFetch.filter(
      (el) => this.messageRepository.findByUser(userLoginId, el.id).length,
    );
  }
}
