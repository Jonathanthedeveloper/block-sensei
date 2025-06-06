import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class AnswerInOptionsConstraint implements ValidatorConstraintInterface {
    validate(answer: string, args: ValidationArguments): boolean;
    defaultMessage(): string;
}
export declare class CreateQuizDto {
    question: string;
    options: string[];
    answer: string;
}
