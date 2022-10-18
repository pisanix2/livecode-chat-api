import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ContactService } from 'src/messages/domain/ports/contact.service';
import { ContactCommand } from './contact.command';

@Controller({
  path: 'contacts',
  version: ['1'],
})
export class ContactController {
  private readonly logger = new Logger(ContactController.name);

  constructor(private contactService: ContactService) {}

  @Get()
  findAll(): any[] {
    return this.contactService.findAll();
  }

  @Post()
  create(@Body() contactCommand: ContactCommand): any {
    const contact = this.contactService.create(contactCommand.name);
    this.logger.debug(contactCommand);
    this.logger.debug({ contact });
    return { ...contact };
  }
}
