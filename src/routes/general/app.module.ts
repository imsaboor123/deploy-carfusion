import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from '../shop/shop.module';
import { BlogPageModule } from '../blogs/blog.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from '../../configs/files/database';
import { UsersEntity } from 'src/models';

import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../../modules/auth/auth.module';
import { AuthController } from '../../nest/modules/auth/auth.controller';
import { UserDataMiddleware } from '../../modules/auth/auth.middleware';
import { BlogModule } from '../../modules/blog/blog.module';
import { ContactModule } from '../../modules/contact/contact.module';
import { ProductModule } from '../../modules/product/product.module';
import { SearchModule } from '../../modules/search/search.module';
import { TestimonialModule } from '../../modules/testimonial/testimonial.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync(database),
		TypeOrmModule.forFeature([UsersEntity]),
		JwtModule.register({global: true, secret: '@fusion', signOptions: {expiresIn: '24h'}}),
		AuthModule,
		BlogModule,
		ContactModule,
		ProductModule,
		SearchModule,
		TestimonialModule,
		ShopModule,
		BlogPageModule
	],
	controllers: [AppController, AuthController],
	providers: [AppService],
})

export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(cookieParser()).forRoutes('*');
		consumer.apply(UserDataMiddleware).forRoutes('*');
	}
}