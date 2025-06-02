import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class QuizAnswerDto {
  @IsString()
  @IsNotEmpty()
  quest_quiz_id: string;

  @IsString()
  @IsNotEmpty()
  user_answer: string;
}

export class CompleteRoundDto {
  @IsString()
  @IsNotEmpty()
  mission_round_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerDto)
  quiz_answers: QuizAnswerDto[];
}
