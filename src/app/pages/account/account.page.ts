import { Component } from '@angular/core';
import { Profile } from 'src/app/interfaces/profile';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'bolao-account',
  templateUrl: './account.page.html',
  styles: [
    `
      h1 {
        font-size: 1.4rem;
        margin-bottom: 2rem;
      }
    `,
  ],
})
export class AccountPage {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {
    this.locale = this.language;
  }

  private _locale: string = 'en';
  public get locale(): string {
    return this._locale;
  }
  public set locale(value: string) {
    this._locale = value;
  }

  get profile(): Profile | undefined {
    return this.authService.profile;
  }

  get language(): string {
    return this.authService.language;
  }

  select(locale: string): void {
    this.locale = locale;
    this.acceptPreferences();
  }

  acceptPreferences(): void {
    if (this.authService.profile) {
      let profile = this.authService.profile;
      profile.picture = undefined;
      profile.attributes.locale = [this.locale];
      this.usersService
        .acceptPreferences(this.authService.profile.id, profile)
        .subscribe({
          next: (profile) => {
            this.authService.profile = profile;
            window.location.reload();
          },
        });
    }
  }
}
