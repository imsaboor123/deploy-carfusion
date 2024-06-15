import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/models';
import { ValidateService } from 'src/shared/services';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		TypeOrmModule.forFeature([UsersEntity]),
		JwtModule.register({ secret: 'hard!to-guess_secret' }),
	],
	providers: [AuthService, ValidateService],
	controllers: [AuthController],
})

export class AuthModule { }