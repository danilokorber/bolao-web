import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  fa1,
  fa2,
  fa3,
  fa4,
  fa5,
  faCircleCheck,
  faEuroSign,
  faLanguage,
  faRankingStar,
  faScaleBalanced,
  faSpinner,
  faUserSecret,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { BonusBet } from 'src/app/interfaces/bet';
import { Team } from 'src/app/interfaces/team';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'bolao-authorizing2',
  templateUrl: './authorizing2.page.html',
  styleUrls: ['./authorizing2.page.scss'],
})
export class Authorizing2Page implements OnInit {
  icon1: IconDefinition = faLanguage;
  icon2: IconDefinition = faUserSecret;
  icon3: IconDefinition = faScaleBalanced;
  icon4: IconDefinition = faRankingStar;
  icon5: IconDefinition = faEuroSign;
  iconCheck: IconDefinition = faCircleCheck;
  iconWa: IconDefinition = faWhatsapp;

  private _params: any;
  private _redirect: any;

  private _skipPayment: boolean = false;
  public get skipPayment(): boolean {
    return this._skipPayment;
  }
  public set skipPayment(value: boolean) {
    this._skipPayment = value;
  }
  private _bonusBets: (Team | undefined)[] = [];

  faLoading = faSpinner;
  private _isLoading: boolean = false;
  public get isLoading(): boolean {
    return this._isLoading;
  }
  public set isLoading(value: boolean) {
    this._isLoading = value;
  }

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this._params = params;
    });
    this._redirect = setInterval(() => this.redirect(), 1000);
  }

  continue(): void {
    let currentStep = this.completedSteps + 1;

    switch (currentStep) {
      case 2:
        this.setDataPrivacy();
        break;
      case 3:
        this.setRuleAcceptance();
        break;
      case 4:
        this.setBonusBets();
        break;
    }
  }

  cancel(): void {
    this.authService.logout();
  }

  paymentConfirmed(): void {
    this.authService.refreshProfile();
  }

  redirect(): void {
    if (this.fullyAuthorized) {
      clearInterval(this._redirect);
      this.router.navigate([this._params.redirect ?? '/dashboard']);
    }
  }

  setDataPrivacy(): void {
    if (this.authService.profile) {
      this.usersService
        .acceptDataPrivacy(this.authService.profile.id)
        .subscribe({
          next: (profile) => {
            this.authService.profile = profile;
          },
        });
    }
  }

  setRuleAcceptance(): void {
    if (this.authService.profile) {
      this.usersService.acceptRules(this.authService.profile.id).subscribe({
        next: (profile) => {
          this.authService.profile = profile;
        },
      });
    }
  }

  setBonusBets(): void {
    let bets: BonusBet = {
      first: [this._bonusBets[0]?.shortName ?? ''],
      second: [this._bonusBets[1]?.shortName ?? ''],
      third: [this._bonusBets[2]?.shortName ?? ''],
      fourth: [this._bonusBets[3]?.shortName ?? ''],
    };

    if (this.authService.profile) {
      this.usersService.bonusBets(this.authService.profile.id, bets).subscribe({
        next: (profile) => {
          this.authService.profile = profile;
        },
      });
    }
  }

  skip(): void {
    this.skipPayment = true;
  }

  betsChanged(bets: any) {
    this._bonusBets = bets;
  }

  get isFullyLoaded(): boolean {
    return this.authService.isTokenLoaded && this.authService.isProfileLoaded;
  }

  get fullyAuthorized(): boolean {
    return (
      this.isFullyLoaded &&
      this.hasAcceptedTerms &&
      this.hasAcceptedDataPrivacy &&
      this.hasPayed
    );
  }

  get betsMissing(): boolean {
    return this._bonusBets.includes(undefined) || this._bonusBets.length != 4;
  }

  get language(): string {
    return this.authService.language;
  }

  get completedSteps(): number {
    if (this.hasPayed) {
      return 5;
    } else if (this.hasBonusBets) {
      return 4;
    } else if (this.hasAcceptedTerms) {
      return 3;
    } else if (this.hasAcceptedDataPrivacy) {
      return 2;
    } else if (this.hasLanguageSet) {
      return 1;
    } else {
      return 0;
    }
  }

  get hasAcceptedDataPrivacy(): boolean {
    return this.authService.hasAcceptedDataPrivacy;
  }

  get hasLanguageSet(): boolean {
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

  getHelp() {
    window.open('https://wa.me/4917660876485', '_blank');
  }
}
