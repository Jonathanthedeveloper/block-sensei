import {
  ArrayNotEmpty,
  IsArray,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'AnswerInOptions', async: false })
export class AnswerInOptionsConstraint implements ValidatorConstraintInterface {
  validate(answer: string, args: ValidationArguments) {
    const object = args.object as CreateQuizDto;
    return Array.isArray(object.options) && object.options.includes(answer);
  }

  defaultMessage() {
    return 'Answer must be one of the options';
  }
}

export class CreateQuizDto {
  @IsString()
  question: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  options: string[];

  @IsString()
  @Validate(AnswerInOptionsConstraint)
  answer: string;
}
