import { Component, OnInit, Input } from '@angular/core';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'bolao-loading-simple',
  templateUrl: './loading-simple.component.html',
  styles: [],
  host: { class: 'mx-auto' },
})
export class LoadingSimpleComponent implements OnInit {
  @Input() size: SizeProp | undefined = '4x';
  faLoading: IconDefinition = faSpinner;
  constructor() {}

  ngOnInit(): void {}
}
