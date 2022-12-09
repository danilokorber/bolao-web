import { Component, OnInit } from '@angular/core';
import { Profile } from '@interfaces/profile';
import { Question } from '@interfaces/question';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '@services/auth.service';
import { SurveyService } from '@services/survey.service';

@Component({
  selector: 'bolao-survey',
  templateUrl: './survey.page.html',
  styles: [],
})
export class SurveyPage implements OnInit {
  constructor(
    private authService: AuthService,
    private translocoService: TranslocoService,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      let survey = this.translocoService.getTranslation(
        'survey/' + this.language
      );
      this._tempQuestions = survey['questions'];
      this.loadAnswers();
    }, 2000);
  }

  loadAnswers(): void {
    this.surveyService.get().subscribe({
      next: (value) => {
        value.forEach((answer) => {
          let q: Question = this._tempQuestions.filter(
            (question) => question.questionId == answer.questionId
          )[0];
          if (q) {
            q.answer = answer.answer;
            q.comments = answer.comments;
          }
        });
        this._questions = this._tempQuestions;
      },
    });
  }

  get profile(): Profile | undefined {
    return this.authService.profile;
  }

  get language(): string {
    return this.authService.language;
  }

  _tempQuestions: Question[] = [];
  _questions: Question[] = [];
  get questions(): Question[] {
    return this._questions;
  }
}
