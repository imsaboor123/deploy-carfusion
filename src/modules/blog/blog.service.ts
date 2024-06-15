import { Injectable } from '@nestjs/common';
import { createBlog, getBlog } from './blog.dto';
import { BlogEntity } from 'src/models';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()

export class BlogService {
	constructor(
		@InjectRepository(BlogEntity)
		private blogRepo: Repository<BlogEntity>,
	) { }

	async createBlog(payload: createBlog) {
		const response = await this.blogRepo.save(payload);
		if (response) return { message: "Your Blog Successfully Added" }
	}

	async getBlog(payload: getBlog) {
		const query: any = {};

		if (Object.keys(payload).length > 0) {
			query.where = Object.fromEntries(
				Object.entries(payload).map(([key, value]) => [key, Like(`%${value}%`)])
			);
		}

		const response = await this.blogRepo.find(query);
		if (response) return { posts: response }
	}

	async getBlogById(payload: { id: number }) {
		const response = await this.blogRepo.findOne({ where: { id: payload.id }});
		if (response) return { posts: response };
	}

	async updateBlog(payload: createBlog, updatedId: any) {
		const response = await this.blogRepo.update(updatedId, payload);
		if (response) return { message: "Your Blog Successfully Updated" }
	}

	async deleteBlogById(payload: { id: number }) {
		const response = await this.blogRepo.delete(payload.id)
		if (response) return { message: "Your Blog Successfully  Deleted" }
	}
}
