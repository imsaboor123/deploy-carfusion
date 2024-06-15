import { Controller, Get, Param, Req, Render, NotFoundException } from '@nestjs/common';

@Controller('shop')
export class ShopController {
	@Get()
	@Render('pages/shop/shop')
	async shop(@Req() request: Request): Promise<{ pathname: string, products: any[] }> {
		const getProducts = await (await fetch('http://localhost:3000/api/v1/product')).json();
		return { pathname: request.url, products: getProducts };
	}

	@Get('/:id')
	@Render('pages/shop/product')
	async product(@Param('id') id: string, @Req() request: Request): Promise<{ pathname: string, product: any[], products: any[] }> {
		const getProduct = await (await fetch(`http://localhost:3000/api/v1/product/${id}`)).json();
		const getProducts = await (await fetch('http://localhost:3000/api/v1/product')).json();
		if (getProduct.products !== null) return { pathname: request.url, products: getProducts, product: getProduct.products[0] };
		throw new NotFoundException();
	}
}