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
  selector: 'bolao-survey-card-checkbox',
  templateUrl: './survey-card-checkbox.component.html',
  styles: [],
})
export class SurveyCardCheckboxComponent implements OnInit {
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
      console.log(this.question);

      this.form = new FormGroup(
        {
          questionId: new FormControl(this.question.questionId),
          comments: new FormControl(this.question.comments),
          answer: new FormControl(
            this.question.answer?.toString().split(',') ?? []
          ),
        },
        [CustomValidator.comments(this.question)]
      );
      console.log(this.form.value);

      this.form.statusChanges.subscribe((result) => {
        if (!this.form.valid) {
          this.commentArea.nativeElement.focus();
        }
        this.form.markAsDirty();
        this.formChanged.emit(this.form);
      });
    }
  }

  click(event: any): void {
    this.form.controls['answer'].setValue(event);
  }

  isChecked(option: string): boolean {
    return (
      this.question.answer?.toString().split(',').includes(option) ?? false
    );
  }
}
