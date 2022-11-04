import { Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Directive()
export class Routes {
  constructor(public router: Router, public activatedRoute: ActivatedRoute) {}
}
