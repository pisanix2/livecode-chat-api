import { Injectable } from '@nestjs/common';
import { Contact } from 'src/messages/domain/model/contact.model';
import { ContactRepository } from 'src/messages/domain/ports/contact.repository';

@Injectable()
export class ContactInMemory implements ContactRepository {
  private readonly contacts: Contact[] = [];

  create(contact: Contact): Contact {
    this.contacts.push(contact);
    return contact;
  }

  findById(id: string): Contact {
    return this.contacts.find((el) => el.id === id);
  }

  findAll(): Contact[] {
    return this.contacts;
  }
}
