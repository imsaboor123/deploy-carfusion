import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('blog')

export class BlogEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
		type: 'int',
	})
	@IsNotEmpty({ message: 'User ID is Required' })
	userId: number;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Title is Required' })
	title: string;

	@Column({
		nullable: true,
		type: 'varchar',
	})
	slug: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Category is Required' })
	category: string;

	@Column({
		nullable: false,
		type: 'text',
	})
	@IsNotEmpty({ message: 'Description is Required' })
	description: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Thumbnail is Required' })
	thumbnail: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}