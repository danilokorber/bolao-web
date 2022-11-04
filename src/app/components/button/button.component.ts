import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bolao-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: { class: 'flex' },
})
export class ButtonComponent {
  @Input() class!: string;
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<any>();

  onClickButton(event: any) {
    this.onClick.emit(event);
  }
}
