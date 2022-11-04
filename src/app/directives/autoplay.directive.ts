import { Directive } from '@angular/core';

@Directive({
  selector: 'video[autoplay]',
  host: {
    autoplay: '',
    oncanplay: 'this.play()',
    onloadedmetadata: 'this.muted = true',
  },
})
export class AutoplayDirective {}
