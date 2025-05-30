import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  address: string;
}
