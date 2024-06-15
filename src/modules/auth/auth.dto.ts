import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class signUp {
	@IsString()
	@IsNotEmpty()
	first_name: string;

	@IsString()
	@IsNotEmpty()
	last_name: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	phone: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}

export class signIn {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}

export class signOut {
	@IsNotEmpty()
	id: number;
}