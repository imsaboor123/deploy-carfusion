import { Body, Controller, Get, Delete, Put, Param, Post, Query, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common';
import { createBlog, getBlog } from './blog.dto';
import slugify from 'slugify';
import { BlogService } from './blog.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { checkAuth } from '../auth/auth.middleware';

@Controller('/api/v1/blog')

export class BlogController {
	constructor(private blogService: BlogService) { }

	@Post('/')
	@UseGuards(checkAuth)
	@UseInterceptors(FilesInterceptor('thumbnail', 1, {
		storage: diskStorage({
			destination: './uploads/blogpost',
			filename: (request, file, callback) => {
				const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
				const ext = extname(file.originalname);
				const filename = `${uniqueSuffix}${ext}`;
				callback(null, filename);
			},
		})
	}))

	createBlog(@UploadedFiles() thumbnail: any, @Body() payload: createBlog) {
		const filename = thumbnail.map((thumb: { filename: any; }) => thumb.filename)[0];
		const data = { ...payload, slug: slugify(payload.title).toLocaleLowerCase(), thumbnail: filename };
		return this.blogService.createBlog(data);
	}

	@Get('/')
	async getBlog(@Query() payload: getBlog) {
		return await this.blogService.getBlog(payload)
	}

	@Get('/:id')
	async getBlogById(@Param() payload: { id: number }) {
		return await this.blogService.getBlogById(payload)
	}

	@Put('/:id')
	@UseGuards(checkAuth)
	@UseInterceptors(FilesInterceptor('thumbnail', 1, {
		storage: diskStorage({
			destination: './uploads/blogpost',
			filename: (request, file, callback) => {
				const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
				const ext = extname(file.originalname);
				const filename = `${uniqueSuffix}${ext}`;
				callback(null, filename);
			},
		})
	}))

	updateBlog(@UploadedFiles() thumbnail: any, @Param() updatedId: { id: number }, @Body() payload: createBlog) {
		const filename = thumbnail.map((thumb: { filename: any; }) => thumb.filename)[0];
		const data = { ...payload, slug: slugify(payload.title).toLocaleLowerCase(), thumbnail: filename };
		return this.blogService.updateBlog(data, updatedId);
	}

	@Delete('/:id')
	@UseGuards(checkAuth)
	async deleteBlogById(@Param() payload: { id: number }) {
		return await this.blogService.deleteBlogById(payload);
	}
}