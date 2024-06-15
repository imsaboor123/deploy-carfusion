import { Injectable } from '@nestjs/common';
import { sendMessage } from './contact.dto';
import { ContactEntity } from 'src/models';
import { Repository } from 'typeorm';
import { EmailService } from './email.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()

export class ContactService {
	constructor(
		@InjectRepository(ContactEntity)
		private contactRepo: Repository<ContactEntity>,
		private emailService: EmailService
	) { }

	async sendMessage(payload: sendMessage) {
		const response = await this.contactRepo.save(payload);
		if (response) {
			const result = await this.emailService.sendEmail(payload.email, "Contact Mail", payload.message)
			if (result.info) return { message: "Your Message Successfuly Sent" }
			console.log(result.error);
			return { error: "Your Message Sending Failed" }
		}
	}
}
