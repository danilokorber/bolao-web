import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'authorizing-preferences',
  templateUrl: './preferences.component.html',
  styles: [],
})
export class PreferencesComponent {
  @Output() onAcceptPreferences: EventEmitter<any> = new EventEmitter<any>();

  private _locale: string = 'en';
  public get locale(): string {
    return this._locale;
  }
  public set locale(value: string) {
    this._locale = value;
  }

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

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
            this.onAcceptPreferences.emit(this.locale);
          },
        });
    }
  }
}
