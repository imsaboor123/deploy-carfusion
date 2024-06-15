import { Injectable } from '@nestjs/common';
import { searchKeywords } from './search.dto';
import { BlogEntity, ProductEntity } from 'src/models';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()

export class SearchService {
	constructor(
		@InjectRepository(BlogEntity)
		private blogRepo: Repository<BlogEntity>,

		@InjectRepository(ProductEntity)
		private productRepo: Repository<ProductEntity>,
	) { }

	async globalSearch(payload: searchKeywords) {
		const query: any = {};

		if (Object.keys(payload).length > 0) {
			query.where = `%${payload}%`;
		}

		// const resultsFromBlog = await this.blogRepo.find(query);
		// const resultsFromProduct = await this.productRepo.find(query);
		// const combinedResults = [...resultsFromBlog, ...resultsFromProduct];
		// console.log(resultsFromProduct);
		// console.log(await this.blogRepo.find(query));
		
		

		// return combinedResults;
	}
}