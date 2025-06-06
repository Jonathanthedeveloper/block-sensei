import { IsString, IsNumber } from 'class-validator';

export class CreateRewardDto {
  @IsNumber()
  amount: number;

  @IsString()
  token: string;
}
