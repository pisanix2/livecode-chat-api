import { Message } from '../model/message.model';

export interface MessageRepository {
  create(message: Message): Message;
  findAll(): Message[];
  findByUser(user: string): Message[];
}

export const MessageRepository = Symbol('MessageRepository');
