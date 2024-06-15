import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { BlogEntity, ProductEntity } from 'src/models';

@Module({
	imports: [TypeOrmModule.forFeature([BlogEntity, ProductEntity])],
	controllers: [SearchController],
	providers: [SearchService],
})

export class SearchModule { }