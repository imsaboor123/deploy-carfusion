import { Injectable } from '@nestjs/common';
import { signUp, signIn, signOut } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { roundPasswordLength } from 'src/shared/files/constant';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/models';
import { Not, Repository } from 'typeorm';
import { Response } from 'express';
import * as Exception from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
	roundPasswordLength = roundPasswordLength;

	constructor(
		@InjectRepository(UsersEntity)
		private userRepo: Repository<UsersEntity>,
		private readonly jwtService: JwtService,
	) { }


	async signUp(payload: signUp) {
		const email = await this.userRepo.findOne({where: { email: payload.email }});
		if (email) return { error: 'This email is already registered' };

		const phone = await this.userRepo.findOne({where: { phone: payload.phone }});
		if (phone) return { error: 'This phone number is already registered' };

		payload.password = await bcrypt.hash(payload.password, roundPasswordLength);

		await this.userRepo.save(payload);
		return { message: "SignUp successfull. Please login to continue" }
	}


	async signIn(payload: signIn, response: Response) {
		const isUser = await this.userRepo.findOne({where: {email: payload.email}});
		if (!isUser) return { error: 'Email not found. please signup to continue' };

		const isPassword = await bcrypt.compare(payload.password, isUser.password);
		if (!isPassword) return { error: 'Incorrect password. please provide a correct password' };

		const token = await this.createToken({id: isUser.id});
		await this.userRepo.update(isUser.id, { token });
		response.cookie('__authToken', token, { httpOnly: true });

		return { message: "SignIn successfull" }
	}


	async signOut(payload: signOut, response: Response) {
		const isUser = await this.userRepo.findOne({where: {id: payload.id}});
		if (!isUser) return { error: 'Account not found. please signin to continue' };

		response.clearCookie('__authToken', { httpOnly: true, secure: true });
		isUser.token = "";
		return response.redirect('/');
	}


	async update_profile(updatedId: any, payload: signUp) {
		const email = await this.userRepo.findOne({where: { email: payload.email, id: Not(updatedId.id) }});
		if (email) return { error: 'This email is already registered' };

		const phone = await this.userRepo.findOne({where: { phone: payload.phone, id: Not(updatedId.id) }});
		if (phone) return { error: 'This phone number is already registered' };

		payload.password = await bcrypt.hash(payload.password, roundPasswordLength);

		const response = await this.userRepo.update(updatedId, payload);
		if (response) return { message: "Profile Successfully Updated" }
	}


	async createToken(payload: any) {
		return await this.jwtService.signAsync(payload, {secret: '@fusion'});
	}
}