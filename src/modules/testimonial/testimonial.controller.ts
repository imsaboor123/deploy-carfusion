import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { IcreateTestomonialDto, IgetTestomonialDto } from './testimonial.dto';
import { TestimonialService } from './testimonial.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('testimonial')
export class TestimonialController {
  constructor(private testimonialService: TestimonialService) {}
  @Post('/')
  @UseInterceptors(FilesInterceptor('images',10,{
    storage:diskStorage({
      destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
    })
  }))
  async post(@UploadedFiles() image: any,@Body() payload: IcreateTestomonialDto) {
    const path =image.map((d)=>{
      return d.path
    })
    JSON.stringify(path)
    payload = {
      ...payload,
      images:path
    }
    return await this.testimonialService.insertTestimonial(payload);
  }

  @Get('/')
  async get(@Query() payload: IgetTestomonialDto) {
    return await this.testimonialService.getTestimonial(payload);
  }

  @Get('/:id')
  async getbyId(@Param() payload: { id: number }) {
    return await this.testimonialService.getTestimonialById(payload);
  }

  @Delete('/:id')
  async delete(@Param() payload: { id: number }) {
    return await this.testimonialService.deleteTestimonial(payload);
  }
}
