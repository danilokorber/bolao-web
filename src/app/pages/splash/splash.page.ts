import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook,
  faGithub,
  faGoogle,
  faMicrosoft,
  faPaypal,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { KeycloakService } from 'keycloak-angular';

enum PROVIDER {
  'FACEBOOK' = 'facebook',
  'GOOGLE' = 'google',
  'TWITTER' = 'twitter',
  'MICROSOFT' = 'microsoft',
  'GITHUB' = 'github',
  'SPOTIFY' = 'spotify',
  'PAYPAL' = 'paypal',
}

@Component({
  selector: 'bolao-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit, OnDestroy {
  videoId: number = Math.floor(Math.random() * 4) + 1;
  iconFacebook: IconDefinition = faFacebook;
  iconGoogle: IconDefinition = faGoogle;
  iconTwitter: IconDefinition = faTwitter;
  iconMicrosoft: IconDefinition = faMicrosoft;
  iconGithub: IconDefinition = faGithub;
  iconPassword: IconDefinition = faLock;
  iconPaypal: IconDefinition = faPaypal;
  provider = PROVIDER;

  //isAuthenticated: Subscription | undefined;
  isManualLogin: boolean = false;
  loginForm: FormGroup = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  redirect: string = 'dashboard';
  language: string = navigator.language.substring(0, 2).toLowerCase();

  constructor(
    private keycloak: KeycloakService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.redirect = params['redirect'] || 'dashboard';
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  get videoUrl(): string {
    return `/assets/v/${this.videoId}.mp4`;
  }

  get isFormInvalid(): boolean {
    return this.loginForm.invalid;
  }

  async logonWith(provider: PROVIDER): Promise<void> {
    this.keycloak
      .login({
        idpHint: provider,
        redirectUri:
          window.location.origin + '/authorizing?redirect=' + this.redirect,
      })
      .then((res) => {
        console.log(res);
      });
  }

  next(): void {
    console.log(this.loginForm);
  }
}
