import { IsString, IsNotEmpty } from 'class-validator';

export class StartMissionDto {
  @IsString()
  @IsNotEmpty()
  mission_id: string;
}
