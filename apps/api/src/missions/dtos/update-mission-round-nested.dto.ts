import {
  IsString,
  IsOptional,
  ValidateNested,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuizDto } from './create-quiz.dto';
import { CreateRewardDto } from './create-reward.dto';

export class UpdateQuestWithRewardDto {
  @IsOptional()
  @IsEnum(['QUIZ'])
  type?: 'QUIZ';

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateRewardDto)
  reward?: CreateRewardDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateQuizDto)
  quiz?: CreateQuizDto[];
}

export class UpdateMissionRoundDto {
  @IsOptional()
  @IsString()
  id?: string; // Include ID for updating existing rounds

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  welcome_message?: string;

  @IsOptional()
  @IsString()
  introduction?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateQuestWithRewardDto)
  quest?: UpdateQuestWithRewardDto;

  @IsOptional()
  @IsString()
  _action?: 'create' | 'update' | 'delete'; // Action to perform on this round
}
