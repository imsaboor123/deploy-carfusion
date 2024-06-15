import { Response } from 'express';
import { Body, Controller, Post, Get, Put, Param, Res, UseGuards } from '@nestjs/common';
import { signUp, signIn } from './auth.dto';
import { AuthService } from './auth.service';
import { checkAuth } from './auth.middleware';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@Post('/signup')
	async signUp(@Body() payload: signUp) {
		return await this.authService.signUp(payload);
	}

	@Post('/signin')
	async signIn(@Body() payload: signIn, @Res({ passthrough: true }) response: Response) {
		return await this.authService.signIn(payload, response);
	}

	@Get('/signout/:id')
	async signOut(@Param() payload: { id: number }, @Res({ passthrough: true }) response: Response) {
		return await this.authService.signOut(payload, response);
	}

	@Put('/update/:id')
	@UseGuards(checkAuth)
	async update_profile(@Param() updatedId: { id: any }, @Body() payload: signUp) {
		return await this.authService.update_profile(updatedId, payload);
	}
}