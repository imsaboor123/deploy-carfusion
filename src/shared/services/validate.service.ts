import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/models';
import { Repository, Not } from 'typeorm';

@Injectable()

export class ValidateService {
    constructor(
        @InjectRepository(UsersEntity)
        private userRepo: Repository<UsersEntity>,
    ) { }

    async IsUserExistByEmail(email: string, id: number) {
        return await this.userRepo.findOne({where: { email, id: Not(id) }});
    }

    async IsUserExistByPhone(phone: string) {
        return await this.userRepo.findOne({where: { phone }});
    }
}