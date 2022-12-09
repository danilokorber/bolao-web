import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SurveyType } from '@enums/survey-type';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Profile } from '@interfaces/profile';
import { Question } from '@interfaces/question';
import { AuthService } from '@services/auth.service';
import { SurveyService } from '@services/survey.service';

@Component({
  selector: 'bolao-survey-card',
  templateUrl: './survey-card.component.html',
  styles: [],
})
export class SurveyCardComponent implements OnInit {
  @Input() question!: Question;
  @Output() onSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  iconSave: IconDefinition = faSave;

  private _form!: FormGroup;
  public get form(): FormGroup {
    return this._form;
  }
  public set form(value: FormGroup) {
    this._form = value;
  }

  constructor(
    private authService: AuthService,
    private surveyService: SurveyService
  ) {}
  ngOnInit(): void {
    if (this.question.answer) this._isStored = true;
  }

  get profile(): Profile | undefined {
    return this.authService.profile;
  }

  get language(): string {
    return this.authService.language;
  }

  get surveyType(): typeof SurveyType {
    return SurveyType;
  }

  private _isStored: boolean = false;
  get isStored(): boolean {
    return this._isStored;
  }

  get isValid(): boolean {
    return this.form?.valid ?? false;
  }

  get isDirty(): boolean {
    return this.form?.dirty ?? false;
  }

  get isPristine(): boolean {
    return this.form?.pristine ?? false;
  }

  onFormChange(form: FormGroup): void {
    this.form = form;
  }

  save(): void {
    if (this.isValid) {
      if (this.question.type == SurveyType.SLIDER) {
        let indexAnswer = this.form.controls['answer'].value;
        if (indexAnswer > 0)
          this.form.controls['answer'].setValue(
            this.question.options[indexAnswer]
          );
      }

      if (this.question.type == SurveyType.CHECKBOX) {
        let answerString = this.form.controls['answer'].value.toString();
        this.form.controls['answer'].setValue(answerString);
      }

      let answer: Partial<Question> = this.form.value;
      this.surveyService.save(answer).subscribe({
        next: (d: Question) => {
          this._isStored = true;
          this.form.markAsPristine();
        },
      });
    }
  }
}
