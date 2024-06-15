import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('contact')

export class ContactEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Full Name is Required' })
	full_name: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Email is Required' })
	email: string;

	@Column({
		nullable: false,
		type: 'text',
	})
	@IsNotEmpty({ message: 'Message is Required' })
	message: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}