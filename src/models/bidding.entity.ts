import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'bidding' })

export class BiddingEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	full_name: string;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	email: string;

	@Column({
		nullable: false,
		type: 'int',
	})
	productId: number;

	@Column({
		nullable: false,
		type: 'varchar',
	})
	price: string;

	@Column({
		nullable: false,
		type: 'text',
	})
	message: string;

	@CreateDateColumn()
	createdAt: Date;

	@OneToMany(() => ProductEntity, (product) => product.id)
	@JoinColumn({ name: 'productId' })
	productEntity: ProductEntity;
}