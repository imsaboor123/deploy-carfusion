import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { sendMessage } from './contact.dto';
import { ContactService } from './contact.service';
import { checkAuth } from '../auth/auth.middleware';

@Controller('api/v1/contact')

export class ContactController {
	constructor(private contactService: ContactService) { }

	@Post('/')
	@UseGuards(checkAuth)
	async sendMessage(@Body() payload: sendMessage) {
		return this.contactService.sendMessage(payload);
	}
}