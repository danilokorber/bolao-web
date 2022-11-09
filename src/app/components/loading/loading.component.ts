import { Component, OnInit, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'bolao-loading',
  templateUrl: './loading.component.html',
  styles: [],
})
export class LoadingComponent implements OnInit {
  faLoading: IconDefinition = faSpinner;
  constructor() {}

  ngOnInit(): void {}
}
