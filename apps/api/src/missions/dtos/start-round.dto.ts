import { IsString, IsNotEmpty } from 'class-validator';

export class StartRoundDto {
  @IsString()
  @IsNotEmpty()
  mission_round_id: string;
}
