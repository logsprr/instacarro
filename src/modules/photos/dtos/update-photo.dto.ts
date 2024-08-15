import { IsArray } from 'class-validator';

export class UpdatePhotoDto {
  @IsArray()
  external: string[];

  @IsArray()
  internal: string[];

  @IsArray()
  engine: string[];

  @IsArray()
  details: string[];
}
