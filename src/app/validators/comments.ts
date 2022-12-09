import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Question } from '@interfaces/question';

export class CustomValidator {
  static comments(question: Question): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      let comments: string = form.get('comments')?.value ?? '';
      let answer: string = form.get('answer')?.value ?? '';

      if (answer != '' && question.demandCommentOptions) {
        let answerIndex: number = question.options.indexOf(answer);

        let isCommentNeeded: boolean =
          question.demandCommentOptions.indexOf(answerIndex) >= 0 ||
          question.demandCommentOptions.indexOf(+answer) >= 0;

        if (isCommentNeeded) {
          if (comments.trim() == '') {
            return { valid: false };
          }
        }
      }

      return null; // means true
    };
  }
}
