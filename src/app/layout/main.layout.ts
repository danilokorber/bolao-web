import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFutbol } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRightFromBracket,
  faDashboard,
  faRankingStar,
  faScrewdriverWrench,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { filter, map } from 'rxjs';
import { Auth } from '../classes/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'bolao-main',
  templateUrl: './main.layout.html',
  styleUrls: ['./main.layout.scss'],
})
export class MainLayout implements OnInit {
  iconDashboard: IconDefinition = faDashboard;
  iconMatches: IconDefinition = faFutbol;
  iconRanking: IconDefinition = faRankingStar;
  iconAccount: IconDefinition = faUserAlt;
  iconAdmin: IconDefinition = faScrewdriverWrench;
  iconExit: IconDefinition = faArrowRightFromBracket;

  private _title: string = '*';

  constructor(
    private authService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

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
    //this.authService.loadUserProfile();
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
}
