import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'bolao-authorizing',
  templateUrl: './authorizing.page.html',
  styleUrls: ['./authorizing.page.scss'],
})
export class AuthorizingPage implements OnInit {
  faLoading = faSpinner;
  private _isLoading: boolean = false;
  public get isLoading(): boolean {
    return this._isLoading;
  }
  public set isLoading(value: boolean) {
    this._isLoading = value;
  }
  private _params: any;
  private _redirect: any;
  private _skipPayment: boolean = false;
  public get skipPayment(): boolean {
    return this._skipPayment;
  }
  public set skipPayment(value: boolean) {
    this._skipPayment = value;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  get isFullyLoaded(): boolean {
    return this.authService.isTokenLoaded && this.authService.isProfileLoaded;
  }

  get fullyAuthorized(): boolean {
    return this.isFullyLoaded && this.hasAcceptedTerms && this.hasPayed;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this._params = params;
    });
    this._redirect = setInterval(() => this.redirect(), 1000);
  }

  redirect(): void {
    if (this.fullyAuthorized) {
      clearInterval(this._redirect);
      this.router.navigate([this._params.redirect ?? '/dashboard']);
    }
  }

  paymentConfirmed(): void {
    this.authService.refreshProfile();
  }

  get hasAcceptedDataPrivacy(): boolean {
    return this.authService.hasAcceptedDataPrivacy;
  }

  get hasDefinedPreferences(): boolean {
    return this.authService.hasDefinedPreferences;
  }

  get hasAcceptedTerms(): boolean {
    return this.authService.hasAcceptedTerms;
  }

  get hasBonusBets(): boolean {
    return this.authService.hasBonusBets;
  }

  get hasPayed(): boolean {
    return this.skipPayment || this.authService.hasConfirmedPayment;
  }
}
