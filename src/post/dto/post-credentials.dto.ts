import { IsNotEmpty } from 'class-validator';

export class PostCredentialsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
