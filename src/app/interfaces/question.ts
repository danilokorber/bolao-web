import { SurveyType } from '@enums/survey-type';

export interface Question {
  questionId: number;
  question: string;
  type: SurveyType;
  group?: string;
  comments?: string;
  options: string[];
  answer?: string | string[] | boolean | boolean[] | number | number[];
  commentPlaceholder?: string;
  defaultOptionIndex?: number;
  demandCommentOptions?: number[];
}
