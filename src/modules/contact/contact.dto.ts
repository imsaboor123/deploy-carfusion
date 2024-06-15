import { IsNotEmpty, IsString } from 'class-validator';

export class sendMessage {
	@IsString()
	@IsNotEmpty()
	full_name: string;

	@IsString()
	@IsNotEmpty()
	email: string

	@IsString()
	@IsNotEmpty()
	message: string;
}