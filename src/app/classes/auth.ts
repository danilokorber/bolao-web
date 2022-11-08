import { Directive, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

import jwtDecode from 'jwt-decode';
import { UsersService } from '../services/users.service';
import { Token } from '../interfaces/token';

@Directive()
export class Auth implements OnDestroy {
  private _profileLoader: any;
  private _isRefreshing: boolean = false;
  public get isRefreshing(): boolean {
    return this._isRefreshing;
  }
  public set isRefreshing(value: boolean) {
    this._isRefreshing = value;
  }
  private _profile: any;
  private _token: Token | undefined;

  constructor(
    public authService: KeycloakService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public usersService: UsersService
  ) {
    this.authService.getToken().then((token) => {
      this._token = jwtDecode(token);
    });
    this._profileLoader = setInterval(() => this.refreshProfile(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this._profileLoader);
  }

  refreshProfile() {
    if (!this.isRefreshing && this.isTokenLoaded && !this.isProfileLoaded) {
      this.isRefreshing = true;
      this.usersService.getProfile().subscribe({
        next: (profile) => {
          this._profile = profile;
          clearInterval(this._profileLoader);
          this.isRefreshing = false;
        },
        error: (e) => {
          console.error(e);
          //this.isRefreshing = false;
        },
      });
    }
  }

  logout(): void {
    sessionStorage.removeItem('profile');
    this.authService.logout(window.location.origin + '/login');
    this.router.navigate(['/']);
  }

  public get isTokenLoaded(): boolean {
    return this._token !== undefined;
  }

  public get isProfileLoaded(): boolean {
    return this._profile !== undefined;
  }

  get tokenExpiresOn(): Date {
    return new Date(); // this.authService.;
  }

  get isAdmin(): boolean {
    return this.authService.getUserRoles().includes('admin');
  }

  get picture(): string {
    if (
      this._profile &&
      this._profile.attributes &&
      this._profile.attributes.picture
    ) {
      return this._profile.attributes.picture[0] || '';
    } else {
      return '';
    }
  }

  get name(): string {
    try {
      return this.authService.getUsername();
    } catch (error) {
      return 'Loading profile...';
    }
  }

  get profile(): any {
    return this._profile;
  }

  get token(): Token | undefined {
    return this._token;
  }
}
