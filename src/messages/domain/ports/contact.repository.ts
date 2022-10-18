import { Contact } from '../model/contact.model';

export interface ContactRepository {
  create(contact: Contact): Contact;
  findById(id: string): Contact;
  findAll(): Contact[];
}

export const ContactRepository = Symbol('ContactRepository');
