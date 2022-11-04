import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bolao-offline',
  templateUrl: './offline.page.html',
  styles: [
    `
      .btn-generic {
        @apply border-gray-900 bg-gray-900;
        @apply text-slate-100;
        @apply hover:border-gray-900 hover:bg-gray-900;
      }
    `,
  ],
})
export class OfflinePage {
  constructor(private router: Router) {}
  tryAgain() {
    this.router.navigate(['/']);
  }
}
