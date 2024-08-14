import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @MaxLength(11)
  @MinLength(11)
  cpf: string;

  @IsEmail()
  email: string;
}
