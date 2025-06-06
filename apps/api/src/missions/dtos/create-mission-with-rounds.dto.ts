import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMissionRoundDto } from './create-mission-round.dto';

export class CreateMissionWithRoundsDto {
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

  @ValidateNested({ each: true })
  @Type(() => CreateMissionRoundDto)
  @IsArray()
  @IsOptional()
  mission_rounds?: CreateMissionRoundDto[];
}
