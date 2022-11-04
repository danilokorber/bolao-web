import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[accountPictureFallback]',
})
export class AccountPictureFallbackDirective {
  @Input() accountPictureFallback!: string;

  constructor(private eRef: ElementRef) {}

  @HostListener('error')
  loadFallbackError() {
    const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
    element.src = this.accountPictureFallback || '/assets/img/al-rihla.png';
  }
}
