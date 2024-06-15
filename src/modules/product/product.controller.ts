import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { createProduct, createBid, getProduct } from './product.dto';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import slugify from 'slugify';
import { checkAuth, isLoggedin } from '../auth/auth.middleware';

@Controller('api/v1/product')

export class ProductController {
	constructor(private productService: ProductService) { }

	@Post('/')
	@UseGuards(isLoggedin)
	@UseInterceptors(
		FilesInterceptor('images', 10, {
			storage: diskStorage({
				destination: './uploads/product',
				filename: (request, file, callback) => {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
					const ext = extname(file.originalname);
					const filename = `${uniqueSuffix}${ext}`;
					callback(null, filename);
				},
			}),
		}),
	)

	async createProduct(@UploadedFiles() images: any, @Body() payload: createProduct) {
		const filename = images.map((image: { filename: any; }) => image.filename);
		const data = { ...payload, slug: slugify(payload.title).toLocaleLowerCase(), images: filename.join(',') };
		return await this.productService.createProduct(data);	
	}

	@Get('/')
	async getProducts(@Query() payload: getProduct) {
		return { products: await this.productService.getProducts(payload) };
	}

	@Get('/:id')
	async getProductById(@Param() payload: { id: number }) {
		return { products: await this.productService.getProductById(payload) };
	}

	@Put('/:id')
	@UseInterceptors(
		FilesInterceptor('images', 10, {
			storage: diskStorage({
				destination: './uploads/product',
				filename: (request, file, callback) => {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
					const ext = extname(file.originalname);
					const filename = `${uniqueSuffix}${ext}`;
					callback(null, filename);
				},
			}),
		}),
	)

	async updateProduct(@UploadedFiles() images: any, @Param() updatedId: { id: number }, @Body() payload: createProduct) {
		const filename = images.map((image: { filename: any; }) => image.filename);
		const data = { ...payload, slug: slugify(payload.title).toLocaleLowerCase(), images: filename.join(',') };
		return await this.productService.updateProduct(data, updatedId);
	}

	@Delete('/:id')
	async deleteProductById(@Param() payload: { id: number }) {
		return await this.productService.deleteProductById(payload);
	}

	//

	@Post('/bid')
	@UseGuards(checkAuth)
	async createBid(@Body() body: createBid) {
		const reslt = await this.productService.createBid(body);	
		if (reslt) return { message: "Your Bid Successfully Accepted" }
	}

	@Get('/bid/:id')
	async getBid(@Param() payload: { id: number }) {
		return { bids: await this.productService.getBid(payload) };
	}
}
