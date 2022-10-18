import { IsNotEmpty } from 'class-validator';

export class ContactCommand {
  @IsNotEmpty()
  name: string;
}
