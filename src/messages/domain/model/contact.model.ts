import { v4 as uuidv4 } from 'uuid';

export class Contact {
  id: string;
  name: string;
  createAt: Date;
  updateAt: Date;
  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
    this.createAt = new Date();
    this.updateAt = new Date();
  }
}
