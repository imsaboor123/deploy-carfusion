import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'abbasiabdulsaboor87@gmail.com',
                pass: 'jgpp kgfq iczc wpai',
            },
        });
    }

    async sendEmail(from: string, subject: string, text: string) {
        const to = 'abbasiabdulsaboor87@gmail.com';
        const mailOptions = { from, to, subject, text};

        try {
            const info = await this.transporter.sendMail(mailOptions);
            return { info };
        } catch (error) {
            return { error }
        }
    }
}