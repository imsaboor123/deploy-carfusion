import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const database: TypeOrmModuleAsyncOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: () => {
		let config: TypeOrmModuleOptions;
		config = {
			type: 'mysql',
			host: 'localhost',
			username: 'root',
			password: '',
			database: 'carfusion',
			entities: [__dirname + './../../models/**/*.entity{.ts,.js}'],
			synchronize: true,
			logging: true,
		};

		return config;
	},
};
