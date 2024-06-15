import { Module } from '@nestjs/common';
import { TestimonialController } from './testimonial.controller';
import { TestimonialService } from './testimonial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimonialEntity } from 'src/models';

@Module({
  imports: [TypeOrmModule.forFeature([TestimonialEntity])],
  controllers: [TestimonialController],
  providers: [TestimonialService],
})
export class TestimonialModule {}
