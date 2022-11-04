import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { KeycloakService } from 'keycloak-angular';
import { Profile } from '../interfaces/profile';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _profileLoader: any;
  private _isRefreshing: boolean = false;
  public get isRefreshing(): boolean {
    return this._isRefreshing;
  }
  public set isRefreshing(value: boolean) {
    this._isRefreshing = value;
  }
  private _token: Token | undefined;

  constructor(
    public keycloakService: KeycloakService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public usersService: UsersService
  ) {
    this.keycloakService.getToken().then((token) => {
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
      console.log(
        'Token is loaded. Refreshing profile... _isRefreshing = ' +
          this.isRefreshing
      );
      this.usersService.getProfile().subscribe({
        next: (profile) => {
          console.log('Profile:', profile);
          this.profile = profile;
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
    sessionStorage.clear();
    this.keycloakService.logout(window.location.origin + '/login');
    this.router.navigate(['/']);
  }

  public get isTokenLoaded(): boolean {
    return this._token !== undefined;
  }

  public get isProfileLoaded(): boolean {
    return this.profile !== undefined;
  }

  public get hasAcceptedTerms(): boolean {
    return (
      this.profile !== undefined &&
      this.profile.attributes.rules_accepted_on?.length > 0
    );
  }

  public get hasDefinedPreferences(): boolean {
    return (
      this.profile !== undefined && this.profile.attributes.locale?.length > 0
    );
  }

  public get hasAcceptedDataPrivacy(): boolean {
    return (
      this.profile !== undefined &&
      this.profile.attributes.data_privacy_accepted_on?.length > 0
    );
  }

  public get hasBonusBets(): boolean {
    return (
      this.profile !== undefined &&
      this.profile.attributes.first?.length == 1 &&
      this.profile.attributes.second?.length == 1 &&
      this.profile.attributes.third?.length == 1 &&
      this.profile.attributes.fourth?.length == 1
    );
  }

  public get hasConfirmedPayment(): boolean {
    return (
      this.profile !== undefined &&
      this.profile.attributes.payment_on?.length > 0
    );
  }

  get tokenExpiresOn(): Date {
    return new Date(); // this.authService.;
  }

  get isAdmin(): boolean {
    return this.keycloakService.getUserRoles().includes('admin');
  }

  get picture(): string[] | undefined {
    return this.profile?.attributes.picture;
  }

  get name(): string {
    try {
      return this.keycloakService.getUsername();
    } catch (error) {
      return 'Loading profile...';
    }
  }

  get profile(): Profile | undefined {
    let prof = sessionStorage.getItem('profile');
    return prof ? JSON.parse(prof) : undefined;
  }

  set profile(value: Profile | undefined) {
    value
      ? sessionStorage.setItem('profile', JSON.stringify(value))
      : sessionStorage.removeItem('profile');
  }

  get language(): string {
    if (this.profile && this.profile.attributes.locale)
      return this.profile.attributes.locale[0];
    return 'en';
  }

  get token(): Token | undefined {
    return this._token;
  }
}
