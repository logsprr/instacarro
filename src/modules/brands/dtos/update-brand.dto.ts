import { IsOptional, IsString } from 'class-validator';

export class UpdateBrandDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  description?: string;
}
