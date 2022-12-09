import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '@interfaces/question';
import { CustomValidator } from '@root/src/app/validators/comments';

@Component({
  selector: 'bolao-survey-card-radio',
  templateUrl: './survey-card-radio.component.html',
  styles: [],
})
export class SurveyCardRadioComponent implements OnInit {
  @Input() question!: Question;
  @Output() formChanged: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @ViewChild('comments') commentArea!: ElementRef;
  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.question) {
      this.form = new FormGroup(
        {
          questionId: new FormControl(this.question.questionId),
          comments: new FormControl(this.question.comments),
          answer: new FormControl(this.question.answer, [Validators.required]),
        },
        [CustomValidator.comments(this.question)]
      );
      this.form.statusChanges.subscribe((result) => {
        if (!this.form.valid) {
          this.commentArea.nativeElement.focus();
        }
        this.formChanged.emit(this.form);
      });
    }
  }

  _value = 0;
  @Input() set value(value: number) {
    this._value = value;
  }
  get value(): number {
    return this._value;
  }
}
