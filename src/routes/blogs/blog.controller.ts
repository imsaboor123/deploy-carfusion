import { Controller, Get, Param, Req, Render, NotFoundException } from '@nestjs/common';

@Controller('blog')
export class BlogController {

	@Get()
	@Render('pages/blog/blog')
	async blogs(@Req() request: Request): Promise<{ pathname: string, blogs: any[] }> {
		const getBlogs = await (await fetch('http://localhost:3000/api/v1/blog')).json();
		return { pathname: request.url, blogs: getBlogs };
	}

	@Get('/:id')
	@Render('pages/blog/single')
	async post(@Param('id') id: string, @Req() request: Request): Promise<{ pathname: string, blog: any[], blogs: any[] }> {
		const getBlog = await (await fetch(`http://localhost:3000/api/v1/blog/${id}`)).json();
		const getBlogs = await (await fetch('http://localhost:3000/api/v1/blog')).json();
		console.log(getBlog.posts)
		if (getBlog.posts !== null) return { pathname: request.url, blogs: getBlogs, blog: getBlog.posts};
		throw new NotFoundException();
	}
}