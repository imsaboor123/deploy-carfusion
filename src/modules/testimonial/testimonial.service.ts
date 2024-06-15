import { InjectRepository } from '@nestjs/typeorm';
import { IcreateTestomonialDto, IgetTestomonialDto } from './testimonial.dto';
import { Injectable } from '@nestjs/common';
import { Like, ObjectId, Repository } from 'typeorm';
import { TestimonialEntity } from 'src/models';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectRepository(TestimonialEntity)
    private testimonialRepo: Repository<TestimonialEntity>,
  ) {}

  insertTestimonial(payload: IcreateTestomonialDto) {
    return this.testimonialRepo.save(payload);
  }

  getTestimonial(payload: IgetTestomonialDto) {
    return this.testimonialRepo.find({
      where: {
        ...(payload?.name && { name: Like(`%${payload.name}%`) }),
        ...(payload?.testimonial && {
          testimonial: Like(`%${payload.testimonial}%`),
        }),
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  getTestimonialById(payload: { id: number }) {
    return this.testimonialRepo.findOne({
      where: {
        id: payload.id,
      },
    });
  }

  deleteTestimonial(payload: { id: number }) {
    return this.testimonialRepo.delete({
      id: payload.id,
    });
  }
}
