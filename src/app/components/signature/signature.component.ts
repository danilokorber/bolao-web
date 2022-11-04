import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bolao-signature',
  template: `
    <a
      class="signature mt-4"
      target="_blank"
      href="https://www.linkedin.com/in/danilokorber/"
      >Danilo Koerber</a
    >
  `,
  styles: [
    `
      .signature {
        font-family: 'Southam Demo';
        @apply text-4xl text-slate-200;
      }
    `,
  ],
})
export class SignatureComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
