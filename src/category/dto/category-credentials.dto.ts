import { IsNotEmpty } from 'class-validator';

export class CategoryCredentialsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
