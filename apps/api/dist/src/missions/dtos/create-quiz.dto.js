"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuizDto = exports.AnswerInOptionsConstraint = void 0;
const class_validator_1 = require("class-validator");
let AnswerInOptionsConstraint = class AnswerInOptionsConstraint {
    validate(answer, args) {
        const object = args.object;
        return Array.isArray(object.options) && object.options.includes(answer);
    }
    defaultMessage() {
        return 'Answer must be one of the options';
    }
};
exports.AnswerInOptionsConstraint = AnswerInOptionsConstraint;
exports.AnswerInOptionsConstraint = AnswerInOptionsConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'AnswerInOptions', async: false })
], AnswerInOptionsConstraint);
class CreateQuizDto {
    question;
    options;
    answer;
}
exports.CreateQuizDto = CreateQuizDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateQuizDto.prototype, "options", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(AnswerInOptionsConstraint),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "answer", void 0);
//# sourceMappingURL=create-quiz.dto.js.map