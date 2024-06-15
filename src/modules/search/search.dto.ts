import { IsOptional } from 'class-validator';

export class searchKeywords {
	@IsOptional()
	keywords: string;
}