import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createBlog {
	@IsNotEmpty()
	userId: number;

	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	category: string

	@IsString()
	@IsNotEmpty()
	description: string;

	thumbnail: string;
}


export class getBlog {
	@IsOptional()
	userId: string;

	@IsOptional()
	title: string;

	@IsOptional()
	slug: string;

	@IsOptional()
	category: string;

	@IsOptional()
	description: string;

	@IsOptional()
	date: Date;
}