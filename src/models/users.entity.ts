import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')

export class UsersEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', nullable: false })
	first_name: string;

	@Column({ type: 'varchar', nullable: false })
	last_name: string;

	@Column({ type: 'varchar', unique: true, nullable: false })
	email: string;

	@Column({ type: 'varchar', unique: true, nullable: false })
	phone: string;

	@Column({ type: 'varchar', nullable: false })
	password: string;

	@Column({ type: 'longtext', nullable: true })
	token: string;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;
}