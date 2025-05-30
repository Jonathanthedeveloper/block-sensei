import { IsString, IsOptional } from 'class-validator';

export class UpdateMissionRoundDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  welcome_message?: string;

  @IsString()
  @IsOptional()
  introduction?: string;

  @IsString()
  @IsOptional()
  quest_id?: string;
}
