import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import {
  IconDefinition,
  faGaugeHigh,
  faFutbol,
  faRankingStar,
  faGear,
  faArrowRightFromBracket,
  faScaleBalanced,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { filter, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import packageInfo from '@root/package.json';

@Component({
  selector: 'sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
})
export class SidebarLayoutComponent implements OnInit {
  appVersion = packageInfo.version;

  iconDashboard: IconDefinition = faGaugeHigh;
  iconMatches: IconDefinition = faFutbol;
  iconRanking: IconDefinition = faRankingStar;
  iconAccount: IconDefinition = faCircleUser;
  iconAdmin: IconDefinition = faGear;
  iconHelp: IconDefinition = faQuestion;
  iconLogout: IconDefinition = faArrowRightFromBracket;
  iconRules: IconDefinition = faScaleBalanced;

  isCollapsed: boolean = true;

  constructor(
    private authService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  private _title: string = '*';

  get language(): string {
    return this.authService.language;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: any) => {
        this._title = data ?? '';
      });
  }

  get title() {
    return this._title;
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  logout() {
    this.authService.logout();
  }

  click(e: any) {
    console.log(e);
  }
}
