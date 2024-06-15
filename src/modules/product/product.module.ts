import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiddingEntity, ProductEntity } from 'src/models';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, BiddingEntity])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
