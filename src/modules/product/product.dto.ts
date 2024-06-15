import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class createProduct {
	@IsNotEmpty()
	userId: number;

	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	model: string;

	@IsString()
	@IsNotEmpty()
	year: string;

	@IsString()
	@IsNotEmpty()
	brand: string;

	@IsString()
	@IsNotEmpty()
	type: string;

	@IsString()
	@IsNotEmpty()
	color: string;

	@IsString()
	@IsNotEmpty()
	price: string;

	@IsString()
	@IsNotEmpty()
	mileage: string;

	@IsString()
	@IsNotEmpty()
	exterior: string;

	@IsString()
	@IsNotEmpty()
	interior: string;

	@IsString()
	@IsNotEmpty()
	accidented: string;

	images: any[];

	@IsNotEmpty()
	image_360: string;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;
}


export class getProduct {
	@IsOptional()
	userId: string;

	@IsOptional()
	title: string;

	@IsOptional()
	description: string;

	@IsOptional()
	model: string;

	@IsOptional()
	year: string;

	@IsOptional()
	brand: string;

	@IsOptional()
	type: string;

	@IsOptional()
	color: string;

	@IsOptional()
	price: string;

	@IsOptional()
	mileage: string;

	@IsOptional()
	exterior: string;

	@IsOptional()
	interior: string;

	@IsOptional()
	accidented: string;

	@IsOptional()
	image_360: string;

	@IsOptional()
	date: Date;
}


export class createBid {
	@IsNotEmpty()
	full_name: string;

	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	productId: number;

	@IsString()
	@IsNotEmpty()
	price: string;

	@IsString()
	@IsNotEmpty()
	message: string;
}