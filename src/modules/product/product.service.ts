import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createProduct, createBid, getProduct } from './product.dto';
import { BiddingEntity, ProductEntity } from 'src/models';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity)
		private productRepo: Repository<ProductEntity>,
		@InjectRepository(BiddingEntity)
		private biddingRepo: Repository<BiddingEntity>,
	) { }

	async createProduct(payload: createProduct) {
		const response = await this.productRepo.save(payload);
		if (response) return { message: "Your Product Successfully Added" }
	}

	async getProducts(payload: getProduct) {
		const query: any = {};

		if (Object.keys(payload).length > 0) {
			query.where = Object.fromEntries(
				Object.entries(payload).map(([key, value]) => [key, Like(`%${value}%`)])
			);
		}

		const response = await this.productRepo.find(query);
		const result = [];

		response.map(product => {
			result.push({ ...product, images: String(product.images).split(',') });
		});

		return result;
	}

	async getProductById(payload: { id: number }) {
		const response = await this.productRepo.findOne({where: { id: payload.id }});
		if (response !== null) return [{ ...response, images: String(response.images).split(',')}];
		return response;
	}

	async updateProduct(payload: createProduct, updatedId: { id: number }) {
		const response = await this.productRepo.update(updatedId, payload);
		if (response) return { message: "Your Product Successfully Updated" }
	}

	async deleteProductById(payload: { id: number }) {
		const response = await this.productRepo.delete(payload);
		if (response) return { message: "Product Successfully Deleted" }
	}

	async createBid(body: createBid) {
		return await this.biddingRepo.save(body);
	}

	async getBid(payload: { id: number }) {
		return await this.biddingRepo.find({where: { productId: payload.id }});
	}
}