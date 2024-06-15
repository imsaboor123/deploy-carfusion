import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from 'src/models';
import { EmailService } from './email.service';

@Module({
	imports: [TypeOrmModule.forFeature([ContactEntity])],
	providers: [ContactService, EmailService],
	controllers: [ContactController],
})

export class ContactModule { }