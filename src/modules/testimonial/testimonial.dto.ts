import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class IcreateTestomonialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  images:string

  @IsString()
  @IsNotEmpty()
  testimonial: string;

  @CreateDateColumn()
  createdAt: Date;
}

export class IgetTestomonialDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  testimonial: string;
}
