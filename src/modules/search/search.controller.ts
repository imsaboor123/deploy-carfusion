import { Controller, Get, Query } from '@nestjs/common';
import { searchKeywords } from './search.dto';
import { SearchService } from './search.service';

@Controller('api/v1/search')

export class SearchController {
	constructor(private searchService: SearchService) { }

	@Get('/')
	async globalSearch(@Query('keywords') keywords: searchKeywords) {
		console.log({ searchResult: await this.searchService.globalSearch(keywords) });
	}
}