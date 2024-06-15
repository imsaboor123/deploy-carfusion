import { Controller, Get, Req, Render, UseGuards, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { isLoggedin, isNotLoggedin } from 'src/modules/auth/auth.middleware';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get('sign-in')
	@UseGuards(isNotLoggedin)
	@Render('pages/auth/signin/signin')
	signIn(@Req() request: Request): { pathname: string } {
		return { pathname: request.url };
	}

	@Get('sign-up')
	@UseGuards(isNotLoggedin)
	@Render('pages/auth/signup/signup')
	signUp(@Req() request: Request): { pathname: string } {
		return { pathname: request.url };
	}

	@Get()
	@Render('pages/home/home')
	async home(@Req() request: Request): Promise<{ pathname: string, products: any[], newProducts: any[], oldProducts: any[], blogs: any[], }> {
		const getAllProducts = await (await fetch('http://localhost:3000/api/v1/product')).json();
		const getNewProducts = await (await fetch('http://localhost:3000/api/v1/product?type=New')).json();
		const getOldProducts = await (await fetch('http://localhost:3000/api/v1/product?type=Old')).json();
		const getBlogs = await (await fetch('http://localhost:3000/api/v1/blog')).json();
		return { pathname: request.url, products: getAllProducts, newProducts: getNewProducts, oldProducts: getOldProducts, blogs: getBlogs };
	}

	@Get('about-us')
	@Render('pages/about/about')
	about(@Req() req: Request): { pathname: string } {
		return { pathname: req.url };
	}

	@Get('testimonials')
	@Render('pages/testimonials/testimonials')
	testimonials(@Req() req: Request): { pathname: string } {
		return { pathname: req.url };
	}

	@Get('faq')
	@Render('pages/faq/faq')
	faq(@Req() req: Request): { pathname: string } {
		return { pathname: req.url };
	}

	@Get('contact')
	@Render('pages/contact/contact')
	contact(@Req() req: Request): { pathname: string } {
		return { pathname: req.url };
	}

	@Get('/profile')
	@UseGuards(isLoggedin)
	@Render('pages/auth/profile/profile')
	async profile(@Req() request: Request, @Res() response: Response): Promise<{ pathname: string, products: any[], blogs: any[], bids: any[] }> {
		const base_url = 'http://localhost:3000/api/v1';
		const userId = response.locals.user.id;

		const getAllProducts = await (await fetch(`${base_url}/product?userId=${userId}`)).json();
		const getAllBlogs = await (await fetch(`${base_url}/blog?userId=${userId}`)).json();

		const getBidsPromises = getAllProducts.products.map(async product =>
			await (await fetch(`${base_url}/product/bid/${product.id}`)).json()
		);

		const getBidsResponses = await Promise.all(getBidsPromises);
		const bids = getBidsResponses.flatMap(response => response.bids);

		return { pathname: request.url, products: getAllProducts, blogs: getAllBlogs, bids };
	}
}