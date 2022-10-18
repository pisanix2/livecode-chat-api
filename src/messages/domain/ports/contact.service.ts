import { Inject, Injectable } from '@nestjs/common';
import { Contact } from '../model/contact.model';
import { ContactRepository } from './contact.repository';

@Injectable()
export class ContactService {
  constructor(
    @Inject(ContactRepository)
    private readonly contactRepository: ContactRepository,
  ) {}

  create(name: string): Contact {
    const contact = new Contact(name);
    this.contactRepository.create(contact);
    return contact;
  }

  findAll(): Contact[] {
    return this.contactRepository.findAll();
  }
}
