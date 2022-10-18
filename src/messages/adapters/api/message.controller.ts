import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import MessageService from 'src/messages/domain/ports/message.service';
import { MessageCommand } from './message.command';

@Controller({
  path: 'messages',
  version: ['1'],
})
export class MessageController {
  private readonly logger = new Logger(MessageController.name);

  constructor(private messageService: MessageService) {}

  @Get()
  findAll(): any[] {
    return this.messageService.findAll();
  }

  @Get(':userLoginId/:userContactId')
  findByUser(@Param() params): any[] {
    return this.messageService.findByUser(
      params.userLoginId,
      params.userContactId,
    );
  }

  @Post()
  create(@Body() messageCommand: MessageCommand): any {
    const message = this.messageService.create(
      messageCommand.content,
      messageCommand.contactOrigin,
      messageCommand.contactDestination,
    );
    this.logger.debug(messageCommand);
    this.logger.debug({ message });
    return { ...message };
  }
}
