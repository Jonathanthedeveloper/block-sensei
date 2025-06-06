import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMissionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  brief: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  clan_id: string;
}
