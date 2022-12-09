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
  selector: 'bolao-survey-card-slider',
  templateUrl: './survey-card-slider.component.html',
  styles: [],
})
export class SurveyCardSliderComponent implements OnInit {
  @Input() question!: Question;
  @Output() formChanged: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @ViewChild('comments') commentArea!: ElementRef;
  form!: FormGroup;

  get marks(): any {
    return this.question.options;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.question) {
      this.form = new FormGroup(
        {
          questionId: new FormControl(this.question.questionId),
          comments: new FormControl(this.question.comments),
          answer: new FormControl(
            this.question.options.indexOf(
              this.question.answer?.toString() ?? ''
            ) ??
              this.question.defaultOptionIndex ??
              0,
            [Validators.required]
          ),
        },
        [CustomValidator.comments(this.question)]
      );
      this.form.statusChanges.subscribe((result) => {
        if (!this.form.valid) {
          this.commentArea.nativeElement.focus();
        }
        this.formChanged.emit(this.form);
      });
      this.form.markAsDirty();
    }
  }
}
