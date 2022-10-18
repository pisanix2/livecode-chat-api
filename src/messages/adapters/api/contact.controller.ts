import { Body, Controller, Get, Logger, Post, Param } from '@nestjs/common';
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

  @Get(':userLoginId')
  findByUser(@Param() params): any[] {
    return this.contactService.findByUser(params.userLoginId);
  }

  @Post()
  create(@Body() contactCommand: ContactCommand): any {
    const contact = this.contactService.create(contactCommand.name);
    this.logger.debug(contactCommand);
    this.logger.debug({ contact });
    return { ...contact };
  }
}
