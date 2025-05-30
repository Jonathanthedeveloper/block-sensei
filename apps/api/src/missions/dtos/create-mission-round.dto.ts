import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsEnum,
  IsArray,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRewardDto } from './create-reward.dto';
import { CreateQuizDto } from './create-quiz.dto';

export class CreateQuestWithRewardDto {
  @IsEnum(['QUIZ'])
  type: 'QUIZ';

  @IsString()
  @IsNotEmpty()
  description: string;

  @ValidateNested()
  @Type(() => CreateRewardDto)
  reward: CreateRewardDto;
  @ValidateIf((o) => o.type === 'QUIZ')
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateQuizDto)
  quiz: CreateQuizDto[];
}

export class CreateMissionRoundDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  welcome_message: string;

  @IsString()
  @IsNotEmpty()
  introduction: string;

  @ValidateNested()
  @Type(() => CreateQuestWithRewardDto)
  @IsOptional()
  quest?: CreateQuestWithRewardDto;
}
