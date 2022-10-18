import { IsNotEmpty } from 'class-validator';

export class MessageCommand {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  contactOrigin: string;
  @IsNotEmpty()
  contactDestination: string;
}
