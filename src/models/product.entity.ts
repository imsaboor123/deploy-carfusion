import { IsNotEmpty, IsArray } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BiddingEntity } from './bidding.entity';

@Entity({ name: 'product' })

export class ProductEntity {
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
		nullable: true,
		type: 'text',
	})
	description: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Model is Required' })
	model: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Year is Required' })
	year: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Brand is Required' })
	brand: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Type is Required' })
	type: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Color is Required' })
	color: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Price is Required' })
	price: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Mileage is Required' })
	mileage: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Exterior is Required' })
	exterior: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Interior is Required' })
	interior: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: 'Accidented is Required' })
	accidented: string;

	@Column({
		nullable: true,
		type: 'text',
	})
	@IsNotEmpty({ message: 'Images are Required' })
	@IsArray()
	images: any[];

	@Column({
		nullable: false,
		type: 'varchar',
	})
	@IsNotEmpty({ message: '360 Image URL is Required' })
	image_360: string;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;

	@ManyToOne(() => BiddingEntity, (data) => data.productEntity)
	biddingEntity: BiddingEntity;
}