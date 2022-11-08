import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

declare const gtag: Function;

@Component({
  selector: 'bolao-root',
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppRoot {
  constructor(private router: Router) {
    /** START : Code to Track Page View using gtag.js */
    const events = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    );

    events.subscribe((e: NavigationEnd) => {
      gtag('event', 'page_view', {
        page_path: e.urlAfterRedirects,
      });
    });
    /** END : Code to Track Page View  using gtag.js */
  }
}
