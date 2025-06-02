import { IsString, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateMissionRoundDto } from './update-mission-round-nested.dto';

export class UpdateMissionDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  brief?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  clan_id?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateMissionRoundDto)
  @IsArray()
  mission_rounds?: UpdateMissionRoundDto[];
}
